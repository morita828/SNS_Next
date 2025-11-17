import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { post, userId } = body;

    if (!post || !userId) {
      return NextResponse.json(
        { error: "不正なリクエストです" },
        { status: 400 }
      );
    }

    const created = await prisma.posts.create({
      data: {
        post,
        user_id: userId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("DBエラー:", err);
    return NextResponse.json({ error: "投稿に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "IDが指定されていません" },
        { status: 400 }
      );
    }

    const deleted = await prisma.posts.delete({
      where: { id },
    });

    return NextResponse.json(deleted, { status: 200 });
  } catch (err) {
    console.error("削除エラー:", err);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, post } = body;

    if (!id || !post) {
      return NextResponse.json(
        { error: "不正なリクエストです" },
        { status: 400 }
      );
    }

    // DB の該当レコードを更新
    const updated = await prisma.posts.update({
      where: { id },
      data: { post },
      include: { user: true },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("更新エラー:", err);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
