import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword")?.trim();

  const loggedInUserId = searchParams.get("excludeId");
  const loggedInUserIdNumber = loggedInUserId
    ? Number(loggedInUserId)
    : undefined;

  const where: any = {};

  if (keyword && keyword !== "") {
    // 部分一致検索（大文字小文字を無視）
    where.username = { contains: keyword, mode: "insensitive" };
  }

  // ユーザー名に部分一致するユーザーを取得
  const users = await prisma.users.findMany({
    where: {
      id: {
        not: loggedInUserIdNumber, // ログインユーザーを除外
      },
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
      username: true,
      images: true,
    },
  });

  return NextResponse.json(users);
}
