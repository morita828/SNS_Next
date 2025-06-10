"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Logout, FormItem, SectionTitle, TextField, Button } from "@/components";
import styles from "./index.module.scss";

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        router.push("/login/top");
        return;
      }

      if (result?.error) {
        if (result.error === "メールアドレスが見つかりません") {
          setError("email", { type: "manual", message: result.error });
        } else if (result.error === "パスワードが正しくありません") {
          setError("password", { type: "manual", message: result.error });
        } else {
          alert(result.error || "ログインに失敗しました");
        }
        return;
      }

      // ✅ ログイン成功 → /login/top に遷移
      router.push("/login/top");

    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div>
      <Logout>
        <SectionTitle>AtlasSNSへようこそ</SectionTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="メールアドレス">
            <TextField
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "正しいメールアドレスを入力してください",
                },
              })}
            />
            {errors.email?.message && (
              <p className={styles.error}>{errors.email.message as string}</p>
            )}
          </FormItem>

          <FormItem label="パスワード">
            <TextField
              type="password"
              {...register("password", {
                required: "パスワードは必須です",
              })}
            />
            {errors.password?.message && (
              <p className={styles.error}>{errors.password.message as string}</p>
            )}
          </FormItem>

          <Button type="submit">ログイン</Button>
        </form>
        <div className={styles.link}>
          <Link href="/logout/register">新規ユーザーの方はこちら</Link>
        </div>
      </Logout>
    </div>
  );
}
