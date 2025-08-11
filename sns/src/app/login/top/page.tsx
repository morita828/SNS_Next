import React from "react";
import styles from "./index.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { redirect } from "next/navigation";
import { Header, PostManager, SideBar } from "@/components";
import prisma from "@/libs/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  if (!session?.user?.id) {
    redirect("/logout/login");
  }

  const rawPosts = await prisma.posts.findMany({
    orderBy: {
      created_at: "desc",
    },
    include: {
      user: true,
    },
  });

  const mappedPosts = rawPosts.map((post) => ({
    ...post,
    updated_at: post.updated_at.toISOString(),
  }));

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <PostManager mappedPosts={mappedPosts} />
        <SideBar />
      </div>
    </div>
  );
}
