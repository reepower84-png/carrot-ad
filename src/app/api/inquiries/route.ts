import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;

  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return NextResponse.json(
      { error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  // Supabase에서 데이터 조회
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: "데이터 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  return NextResponse.json({ inquiries: data });
}

export async function PATCH(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const password = process.env.ADMIN_PASSWORD;

  if (!authHeader || authHeader !== `Bearer ${password}`) {
    return NextResponse.json(
      { error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID와 상태값이 필요합니다." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("inquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "상태 업데이트 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "상태가 업데이트되었습니다." });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { error: "상태 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
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

    // Supabase에서 데이터 삭제
    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "문의 삭제 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "문의가 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { error: "문의 삭제 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
