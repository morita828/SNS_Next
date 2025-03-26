"use client";

import { Logout, Button } from "@/components";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./index.module.scss";


export default function Page() {
  const router = useRouter();

  // ボタンのクリックで /login に遷移
  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Logout>
      <div className={styles.container}>
        <div className={styles.username}>
          <h2>ユーザー名さん</h2>
         <h2>ようこそ！AtlasSNSへ</h2>
        </div>
        <div className={styles.content}>
          <p>ユーザー登録が完了いたしました。</p>
          <p>早速ログインをしてみましょう！</p>
        </div>
        <Button>
          <Link href="/logout/login">ログイン画面へ</Link>
        </Button>
      </div>
    </Logout>
  );
}
