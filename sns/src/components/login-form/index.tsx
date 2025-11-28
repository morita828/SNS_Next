"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormItem, Button } from "@/components";
import styles from "./index.module.scss";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* メールアドレス */}
      <FormItem
        label="メールアドレス"
        name="email"
        register={register}
        rules={{
          required: "メールアドレスは必須です",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "正しいメールアドレスを入力してください",
          },
        }}
        error={errors.email}
      />

      {/* パスワード */}
      <FormItem
        label="パスワード"
        name="password"
        type="password"
        register={register}
        rules={{
          required: "パスワードは必須です",
        }}
        error={errors.password}
      />

      <div className={styles["button-wrapper"]}>
        <Button type="submit">ログイン</Button>
      </div>
    </form>
  );
};
