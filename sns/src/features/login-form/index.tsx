"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components";

export const LoginForm: React.FC = () => {
  const {} = useForm();
  return (
    <form>
      <label>メールアドレス</label>
      <input type="email" />
      <label>パスワード</label>
      <input type="password" />
      <Button>ログイン</Button>
    </form>
  );
};
