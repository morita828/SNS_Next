import React from "react";
import styles from "./index.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { LinkButton } from "@/components";

type SideBarProps = {
  children?: React.ReactNode;
};

export const SideBar = async ({ children }: SideBarProps) => {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await getUserById(session.user.id) : null;

  return (
    <div className={styles["side-bar"]}>
      <div className={styles.confirm}>
        <p>{user?.username}さんの</p>
        <div className={styles.content}>
          <div className={styles.section}>
            <p>フォロー数</p>
            <p>〇〇人</p>
          </div>
          <div className={styles.wrapper}>
            <LinkButton href="/login/follow-list" color="blue">
              フォローリスト
            </LinkButton>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <p>フォロワー数</p>
            <p>〇〇人</p>
          </div>
          <div className={styles.wrapper}>
            <LinkButton href="/login/follower-list" color="blue">
              フォロワーリスト
            </LinkButton>
          </div>
        </div>
      </div>
      <div className={styles["search-button"]}>
        <LinkButton href="/login/search" color="blue">
          ユーザー検索
        </LinkButton>
      </div>
    </div>
  );
};
