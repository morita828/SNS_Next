"use client";

import { Logout, Button } from "@/components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("registeredUserName");
    console.log("登録済みユーザー名:", storedUserName);
    setUserName(storedUserName);
    setTimeout(() => {
      localStorage.removeItem("registeredUserName");
    }, 3000);
  }, []);

  return (
    <Logout>
      <div className={styles.container}>
        <div className={styles.username}>
          <h2>{userName}さん</h2>
          <h2>ようこそ！AtlasSNSへ</h2>
        </div>
        <div className={styles.content}>
          <p>ユーザー登録が完了いたしました。</p>
          <p>早速ログインをしてみましょう！</p>
        </div>
        <div className={styles["button-wrapper"]}>
          <Button>
            <Link href="/logout/login">ログイン画面へ</Link>
          </Button>
        </div>
      </div>
    </Logout>
  );
}
