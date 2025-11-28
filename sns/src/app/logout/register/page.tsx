import React from "react";
import Link from "next/link";
import { Logout, RegisterForm, SectionTitle } from "@/components";
import styles from "./index.module.scss";

export default function Page() {
  return (
    <div>
      <Logout>
        <SectionTitle>新規ユーザー登録</SectionTitle>
        <RegisterForm />
        <div className={styles.link}>
          <Link href="/logout/login">ログイン画面に戻る</Link>
        </div>
      </Logout>
    </div>
  );
}
