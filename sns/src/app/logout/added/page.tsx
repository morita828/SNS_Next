"use client";

import { Logout, Button } from "@/components";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // ボタンのクリックで /login に遷移
  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Logout>
      <div>
        <h2>ユーザー名さん</h2>
        <h2>ようこそ！AtlasSNSへ</h2>
      </div>
      <p>ユーザー登録が完了いたしました。</p>
      <p>早速ログインをしてみましょう！</p>
      <Button onClick={handleLoginRedirect}>ログイン画面へ</Button>
    </Logout>
  );
}
