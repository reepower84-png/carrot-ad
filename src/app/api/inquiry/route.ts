import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "inquiries.json");

function getInquiries(): Inquiry[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading inquiries:", error);
  }
  return [];
}

function saveInquiries(inquiries: Inquiry[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2));
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
        value: new Date(inquiry.createdAt).toLocaleString("ko-KR", {
          timeZone: "Asia/Seoul",
        }),
        inline: false,
      },
    ],
    footer: {
      text: "당근마켓광고 - 제이코리아",
    },
    timestamp: inquiry.createdAt,
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

    const inquiry: Inquiry = {
      id: Date.now().toString(),
      name,
      phone,
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    const inquiries = getInquiries();
    inquiries.unshift(inquiry);
    saveInquiries(inquiries);

    await sendDiscordNotification(inquiry);

    return NextResponse.json(
      { message: "문의가 성공적으로 접수되었습니다.", id: inquiry.id },
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
