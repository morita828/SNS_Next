"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormItem, Button } from "@/components";
import styles from "./index.module.scss";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.userName,
          mail: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error("登録エラー:", result);
        alert(result.error || "登録に失敗しました");
        return;
      }

      localStorage.setItem("registeredUserName", data.userName);

      setTimeout(() => {
        router.push("/logout/added");
      }, 500);
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ユーザー名 */}
      <FormItem
        label="ユーザー名"
        name="userName"
        register={register}
        rules={{
          required: "ユーザー名は必須です",
          minLength: {
            value: 2,
            message: "ユーザー名は2文字以上で入力してください",
          },
          maxLength: {
            value: 12,
            message: "ユーザー名は12文字以内で入力してください",
          },
        }}
        error={errors.userName}
      />

      {/* メールアドレス */}
      <FormItem
        label="メールアドレス"
        name="email"
        register={register}
        rules={{
          required: "メールアドレスは必須です",
          minLength: {
            value: 5,
            message: "メールアドレスは5文字以上で入力してください",
          },
          maxLength: {
            value: 40,
            message: "メールアドレスは40文字以内で入力してください",
          },
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
          minLength: {
            value: 8,
            message: "パスワードは8文字以上で入力してください",
          },
          maxLength: {
            value: 20,
            message: "パスワードは20文字以内で入力してください",
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "パスワードは英数字のみで入力してください",
          },
        }}
        error={errors.password}
      />

      {/* パスワード確認 */}
      <FormItem
        label="パスワード確認"
        name="confirmPassword"
        type="password"
        register={register}
        rules={{
          required: "確認用パスワードは必須です",
          minLength: {
            value: 8,
            message: "確認用パスワードは8文字以上で入力してください",
          },
          maxLength: {
            value: 20,
            message: "確認用パスワードは20文字以内で入力してください",
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "確認用パスワードは英数字のみで入力してください",
          },
          validate: (value: string) =>
            value === watch("password") || "パスワードが一致しません",
        }}
        error={errors.confirmPassword}
      />

      <div className={styles["button-wrapper"]}>
        <Button type="submit">新規登録</Button>
      </div>
    </form>
  );
};
