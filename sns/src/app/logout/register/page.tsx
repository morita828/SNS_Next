"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logout, FormItem, SectionTitle, TextField, Button } from "@/components";
import styles from "./index.module.scss";

// カスタムフックとして切り出し
function useCredentials() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // 初期化処理
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  return { userName, setUserName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword };
}

export default function Page() {
  const router = useRouter();
  const { userName, setUserName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = useCredentials();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !email || !password || !confirmPassword) {
      alert("全ての項目を入力してください");
      return;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, mail: email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
      console.error("登録エラー:", data);
      alert(data.error || "登録に失敗しました");
      return;
    }

      router.push("/logout/added");

    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div>
      <Logout>
        <SectionTitle>新規ユーザー登録</SectionTitle>
        <form onSubmit={handleSubmit}>
          <FormItem label="ユーザー名">
            <TextField value={userName} onChange={(e) => setUserName(e.target.value)} />
          </FormItem>
          <FormItem label="メールアドレス">
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormItem>
          <FormItem label="パスワード">
            <TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormItem>
          <FormItem label="パスワード確認">
            <TextField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormItem>
          <Button type="submit">新規登録</Button>
        </form>
        <div className={styles.link}>
          <Link href="/logout/login">ログイン画面に戻る</Link>
        </div>
      </Logout>
    </div>
  );
}
