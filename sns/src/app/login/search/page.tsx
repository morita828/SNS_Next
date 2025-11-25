import React from "react";
import styles from "./index.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { redirect } from "next/navigation";
import { Header, SideBar, Search } from "@/components";
import prisma from "@/libs/prisma";

type User = {
  id: string;
  username: string;
  images: string;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  if (!session?.user?.id) {
    redirect("/logout/login");
  }

  const loginUserId = session.user.id;

  const rawUsers = await prisma.users.findMany({
    orderBy: {
      created_at: "desc",
    },
    where: {
      id: { not: loginUserId },
    },
  });

  const mappedUsers: User[] = rawUsers.map((user) => ({
    id: user.id.toString(), // number → string に変換
    username: user.username,
    images: user.images ?? "", // null の場合は空文字
  }));

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <Search
          mappedUsers={mappedUsers}
          loginUserId={loginUserId.toString()}
        />
        <SideBar />
      </div>
    </div>
  );
}
