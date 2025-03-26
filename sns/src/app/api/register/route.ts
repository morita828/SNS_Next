import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, mail, password } = await req.json();

    // 既に登録済みか確認
    const existingUser = await prisma.users.findUnique({
      where: { mail },
    });

    if (existingUser) {
      return NextResponse.json({ error: "このメールアドレスは既に使用されています" }, { status: 400 });
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー作成
    const user = await prisma.users.create({
      data: {
        username,
        mail,
        password: hashedPassword,
        // bioやimagesは省略しても問題ない場合
        bio: "",   // デフォルト値として空文字を設定
        images: "" // デフォルト値として空文字を設定
      },
    });

    return NextResponse.json({ message: "登録成功", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "登録に失敗しました" }, { status: 500 });
  }
}
