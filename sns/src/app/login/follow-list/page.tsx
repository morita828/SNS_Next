import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { redirect } from "next/navigation";

import { Header, SideBar } from "@/components";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/logout/login");
  }

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <div className={styles.contents}>
          <div className={styles["wrapper"]}>
            <div className={styles["inner"]}>
              <h2>フォローリスト</h2>
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
        <SideBar />
      </div>
    </div>
  );
}
