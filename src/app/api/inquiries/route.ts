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

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;

  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return NextResponse.json(
      { error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  const inquiries = getInquiries();

  return NextResponse.json({ inquiries });
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;

  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return NextResponse.json(
      { error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "삭제할 문의 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const inquiries = getInquiries();
    const filteredInquiries = inquiries.filter((inq) => inq.id !== id);

    if (filteredInquiries.length === inquiries.length) {
      return NextResponse.json(
        { error: "해당 문의를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(filteredInquiries, null, 2));

    return NextResponse.json({ message: "문의가 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "문의 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
