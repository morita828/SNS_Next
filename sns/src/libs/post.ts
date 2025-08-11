"use server";
import prisma from "@/libs/prisma";

/**
 * 新規投稿をデータベースに作成します。
 * @async
 * @function addPost
 * @param {FormData} data - 新規投稿のデータ
 */
export const addPost = async (data: FormData) => {
  const post = data.get("post") as string;
  const userId = parseInt(data.get("user_id") as string);

  await prisma.posts.create({
    data: {
      post,
      user_id: userId,
    },
  });
};

/**
 * 全ての投稿を取得（ユーザー情報を含む）
 */
export const getAllPosts = async () => {
  return await prisma.posts.findMany({
    include: {
      user: true,
    },
    orderBy: {
      created_at: "desc", // desc=最新順に並べる
    },
  });
};

/**
 * 指定されたIDの投稿を削除します。
 */
export const deletePost = async (data: FormData) => {
  const id = Number(data.get("id"));
  if (!id) return;

  // データベースから1レコード削除
  await prisma.posts.delete({
    where: {
      id,
    },
  });
};

/**
 * 指定されたIDの投稿を更新します。
 * @param {FormData} data - 'id', 'title', 'body' を含むフォームデータ
 */
export const updatePost = async (data: FormData) => {
  const id = parseInt(data.get("id") as string);
  const post = data.get("post") as string;

  // データベースのレコードを更新
  await prisma.posts.update({
    where: {
      id,
    },
    data: {
      post,
    },
  });
};
