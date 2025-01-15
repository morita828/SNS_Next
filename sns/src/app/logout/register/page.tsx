"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logout, FormItem, SectionTitle, TextField, Button } from "@/components";

function useCredentials() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return { text, setText, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword };
}

export default function Page() {
  const { text, setText, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword } = useCredentials();

  useEffect(() => {
    setText("");
    setEmail("")
    setPassword("");
    setConfirmPassword("");
  }, [setText, setEmail, setPassword, setConfirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // パスワードが一致するかを確認
    if (password !== confirmPassword) {
      alert("パスワードが一致しません");
      return;
    }

    // 新規登録処理（APIに送信など）
    console.log({ text, email, password });
  };

  return (
    <div>
      <Logout>
        <SectionTitle>新規ユーザー登録</SectionTitle>
        <form onSubmit={handleSubmit}>
          <FormItem label="ユーザー名">
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FormItem>
          <FormItem label="メールアドレス">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          <FormItem label="パスワード">
            <TextField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <FormItem label="パスワード確認">
            <TextField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormItem>
          <Button type="submit">新規登録</Button>
        </form>
        <Link href="/logout/login">ログイン画面に戻る</Link>
      </Logout>
    </div>
  );
}
