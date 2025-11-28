"use client";

import React from "react";
import styles from "./index.module.scss";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { TextField } from "@/components";

type FormItemProps = {
  label: string;
  name: string;
  register: any; // React Hook Form の register
  rules?: any; // フィールドごとのバリデーションルール
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  type?: "text" | "email" | "password" | "url" | "search";
};

export const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  register,
  rules,
  error,
  type = "text", // デフォルトは text
}) => {
  const errorMessage =
    typeof error === "string" ? error : (error?.message as string | undefined);

  return (
    <div className={styles.section}>
      <label className={styles["section-name"]}>{label}</label>
      <TextField type={type} {...register(name, rules)} />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
