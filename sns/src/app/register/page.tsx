"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logout, FormItem, TextField, Button } from "@/components";

function useCredentials() {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return { text, setText, email, setEmail, password, setPassword };
}

export default function Page() {
  const { text, setText, email, setEmail, password, setPassword } = useCredentials();

  useEffect(() => {
    setText("");
    setEmail("")
    setPassword("");
  }, [setText, setEmail, setPassword]);

  return (
    <div>
      <Logout>
        <h1>新規ユーザー登録</h1>
        <form>
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
          <Button type="submit">新規登録</Button>
        </form>
        <Link href="/login">ログイン画面に戻る</Link>
      </Logout>
    </div>
  );
}
