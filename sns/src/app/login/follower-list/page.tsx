import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { redirect } from "next/navigation";

import { Header, Button } from "@/components";


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/logout/login");
  }

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <div className={styles.contents}>
          <div className={styles["wrapper"]}>
            <div className={styles["inner"]}>
              <h2>フォロワーリスト</h2>
              <Image
                src="/images/icon2.png"
                width={55}
                height={55}
                alt="icon"
              />
            </div>
          </div>
          <div className={styles["post-item"]}>
            <Image
              src="/images/icon1.png"
              width={50}
              height={50}
              alt="icon"
              style={{ width: "50px", height: "50px" }}
              priority
            />
            <div className={styles["post-detail"]}>
              <p>ユーザー名</p>
              <p>フォローしている人が投稿した内容</p>
            </div>
          </div>
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
