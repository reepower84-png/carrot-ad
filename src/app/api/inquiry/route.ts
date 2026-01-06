import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface InquiryInput {
  name: string;
  phone: string;
  message: string;
}

interface Inquiry extends InquiryInput {
  id: string;
  created_at: string;
}

async function sendDiscordNotification(inquiry: Inquiry): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("Discord webhook URL not configured");
    return;
  }

  const embed = {
    title: "새로운 상담 문의가 접수되었습니다!",
    color: 0xff6f0f,
    fields: [
      {
        name: "이름",
        value: inquiry.name,
        inline: true,
      },
      {
        name: "전화번호",
        value: inquiry.phone,
        inline: true,
      },
      {
        name: "상담 문의",
        value: inquiry.message || "(내용 없음)",
        inline: false,
      },
      {
        name: "접수 시간",
        value: new Date(inquiry.created_at).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        }),
        inline: false,
      },
    ],
    footer: {
      text: "당근마켓광고 - 제이코리아",
    },
    timestamp: inquiry.created_at,
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error("Error sending Discord notification:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 전화번호는 필수입니다." },
        { status: 400 }
      );
    }

    // Supabase에 데이터 저장
    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          name,
          phone,
          message: message || "",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "문의 저장 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // Discord 알림 전송
    await sendDiscordNotification(data as Inquiry);

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다.", id: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { error: "문의 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
