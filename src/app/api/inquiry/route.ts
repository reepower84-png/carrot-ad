import { NextRequest, NextResponse } from "next/server";

async function sendDiscordNotification(data: {
  name: string;
  phone: string;
  message: string;
}): Promise<void> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Discord webhook URL not configured");
  }

  const now = new Date().toISOString();

  const embed = {
    title: "새로운 상담 문의가 접수되었습니다!",
    color: 0xff6f0f,
    fields: [
      {
        name: "이름",
        value: data.name,
        inline: true,
      },
      {
        name: "전화번호",
        value: data.phone,
        inline: true,
      },
      {
        name: "상담 문의",
        value: data.message || "(내용 없음)",
        inline: false,
      },
      {
        name: "접수 시간",
        value: new Date(now).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        }),
        inline: false,
      },
    ],
    footer: {
      text: "동네광고연구소 - 제이코리아",
    },
    timestamp: now,
  };

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      embeds: [embed],
    }),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook failed: ${response.status}`);
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

    // Discord로 직접 알림 전송
    await sendDiscordNotification({ name, phone, message: message || "" });

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다." },
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
