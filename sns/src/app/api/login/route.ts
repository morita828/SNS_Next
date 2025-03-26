import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { mail, password } = await req.json();

    const users = await prisma.users.findUnique({ where: { mail } });

    if (!users) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(password, users.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "パスワードが間違っています" }, { status: 400 });
    }

    const token = jwt.sign({ userId: users.id }, "your_secret_key", { expiresIn: "1h" });

    return NextResponse.json({ message: "ログイン成功", token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "ログインに失敗しました" }, { status: 500 });
  }
}
