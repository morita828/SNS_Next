"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logout, FormItem, SectionTitle, TextField, Button } from "@/components";

// メールアドレスとパスワードの状態を管理するカスタムフック
function useCredentials() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return { email, setEmail, password, setPassword };
}

export default function Page() {
  const { email, setEmail, password, setPassword } = useCredentials();

  // ページマウント時にメールアドレスとパスワードをクリア
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [setEmail, setPassword]);

  return (
    <div>
      <Logout>
        <SectionTitle>AtlasSNSへようこそ</SectionTitle>
        <form>
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
          <Button type="submit">ログイン</Button>
        </form>
        <Link href="/register">新規ユーザーの方はこちら</Link>
      </Logout>
    </div>
  );
}
