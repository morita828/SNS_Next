import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { Button } from "@/components";


type SideBarProps = {
  children?: React.ReactNode;
}

export const SideBar = async ({ children }: SideBarProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  return (
    <div className={styles["side-bar"]}>
      <div className={styles.confirm}>
        <p>{user?.username}さんの</p>
        <div className={styles.section}>
          <p>フォロー数</p>
          <p>〇〇人</p>
        </div>
        <Link href="/login/follow-list">
          <Button color="blue" >フォローリスト</Button>
        </Link>
        <div className={styles.section}>
          <p>フォロワー数</p>
          <p>〇〇人</p>
        </div>
        <Link href="/login/follower-list">
          <Button color="blue">フォロワーリスト</Button>
        </Link>
      </div>
      <div className={styles["search-button"]}>
        <Link href="/login/search">
          <Button color="blue">ユーザー検索</Button>
        </Link>
      </div>
    </div>
  );
};
