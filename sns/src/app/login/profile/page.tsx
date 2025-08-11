import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";

import { Header, Button } from "@/components";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <div className={styles.contents}>
          <div className={styles["wrapper"]}>
            <div className={styles["inner"]}>
              <Image
                src="/images/icon1.png"
                width={50}
                height={50}
                alt="icon"
                style={{ width: "50px", height: "50px" }}
                priority
              />
              <div>
                <h2>ユーザー名</h2>
                <h2>メールアドレス</h2>
                <h2>パスワード</h2>
                <h2>パスワード確認</h2>
                <h2>自己紹介</h2>
                <h2>アイコン画像</h2>
              </div>
            </div>
          </div>
          <Button>更新</Button>
        </div>
        <div className={styles["side-bar"]}>
          <div className={styles.confirm}>
            <p>〇〇さんの</p>
            <div className={styles.section}>
              <p>フォロー数</p>
              <p>〇〇人</p>
            </div>
            <Button color="blue">
              <Link href="/login/follow-list">フォローリスト</Link>
            </Button>
            <div className={styles.section}>
              <p>フォロワー数</p>
              <p>〇〇人</p>
            </div>
            <Button color="blue">
              <Link href="/login/follower-list">フォロワーリスト</Link>
            </Button>
          </div>
          <div className={styles["search-button"]}>
            <Button color="blue">
              <Link href="/login/search">ユーザー検索</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
