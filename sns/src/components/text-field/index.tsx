import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./index.module.scss";

// HTMLInputElement に対する標準の input props をすべて受け取れるようにする
type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "email" | "url" | "search" | "password";
};

// type TextFieldProps = {
//   type?: "text" | "email" | "url" | "search" | "password";
//   value?: string;
//   placeholder?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = "text", className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={styles.textField}
        {...props} // onChange, onBlur, name なども spread で適用
      />
    );
  }
);
// displayNameを設定
TextField.displayName = "TextField";
