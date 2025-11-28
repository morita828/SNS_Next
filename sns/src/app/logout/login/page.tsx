import React from "react";
import Link from "next/link";
import { Logout, SectionTitle, LoginForm } from "@/components";
import styles from "./index.module.scss";

export default function Page() {
  return (
    <div>
      <Logout>
        <SectionTitle>AtlasSNSへようこそ</SectionTitle>
        <LoginForm />
        <div className={styles.link}>
          <Link href="/logout/register">新規ユーザーの方はこちら</Link>
        </div>
      </Logout>
    </div>
  );
}
