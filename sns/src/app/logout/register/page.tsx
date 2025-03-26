"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logout, FormItem, SectionTitle, TextField, Button } from "@/components";
import styles from "./index.module.scss";

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: data.userName, mail: data.email, password: data.password }),
      });

      const result = await res.json();
      if (!res.ok) {
        console.error("登録エラー:", result);
        alert(result.error || "登録に失敗しました");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ユーザー名 */}
          <FormItem label="ユーザー名">
            <TextField
              {...register("userName", {
                required: "ユーザー名は必須です",
                minLength: { value: 2, message: "ユーザー名は2文字以上で入力してください" },
                maxLength: { value: 12, message: "ユーザー名は12文字以内で入力してください" },
              })}
            />
            {errors.userName?.message && <p className={styles.error}>{errors.userName.message as string}</p>}
          </FormItem>

          {/* メールアドレス */}
          <FormItem label="メールアドレス">
            <TextField
              {...register("email", {
                required: "メールアドレスは必須です",
                minLength: { value: 5, message: "メールアドレスは5文字以上で入力してください" },
                maxLength: { value: 40, message: "メールアドレスは40文字以内で入力してください" },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "正しいメールアドレスを入力してください" }
              })}
            />
            {errors.email?.message && <p className={styles.error}>{errors.email.message as string}</p>}
          </FormItem>

          {/* パスワード */}
          <FormItem label="パスワード">
            <TextField
              type="password"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: { value: 8, message: "パスワードは8文字以上で入力してください" },
                maxLength: { value: 20, message: "パスワードは20文字以内で入力してください" },
                pattern: { value: /^[a-zA-Z0-9]+$/, message: "パスワードは英数字のみで入力してください" }
              })}
            />
            {errors.password?.message && <p className={styles.error}>{errors.password.message as string}</p>}
          </FormItem>

          {/* パスワード確認 */}
          <FormItem label="パスワード確認">
            <TextField
              type="password"
              {...register("confirmPassword", {
                required: "確認用パスワードは必須です",
                minLength: { value: 8, message: "確認用パスワードは8文字以上で入力してください" },
                maxLength: { value: 20, message: "確認用パスワードは20文字以内で入力してください" },
                pattern: { value: /^[a-zA-Z0-9]+$/, message: "確認用パスワードは英数字のみで入力してください" },
                validate: value => value === watch("password") || "パスワードが一致しません"
              })}
            />
            {errors.confirmPassword?.message && <p className={styles.error}>{errors.confirmPassword.message as string}</p>}
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
