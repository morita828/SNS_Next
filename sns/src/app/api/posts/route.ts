import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { post, userId } = body;

    if (!post || !userId) {
      return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
    }

    const created = await prisma.posts.create({
      data: {
        post,
        user_id: userId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("DBエラー:", err);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}
