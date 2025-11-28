import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { Header, SideBar, Button } from "@/components";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await getUserById(session.user.id) : null;
  const imageSrc = user?.images
    ? user.images.startsWith("/")
      ? user.images
      : `/images/${user.images}`
    : "/images/default-icon.png";

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <div className={styles.contents}>
          <div className={styles["wrapper"]}>
            <div className={styles["inner"]}>
              <div>
                <Image
                  src={imageSrc}
                  width={50}
                  height={50}
                  alt="icon"
                  priority
                />
              </div>
              <div className={styles["profile-item"]}>
                <h2>ユーザー名</h2>
                <h2>メールアドレス</h2>
                <h2>パスワード</h2>
                <h2>パスワード確認</h2>
                <h2>自己紹介</h2>
                <h2>アイコン画像</h2>
              </div>
            </div>
          </div>
          <div className={styles["button-wrapper"]}>
            <Button>更新</Button>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
}
