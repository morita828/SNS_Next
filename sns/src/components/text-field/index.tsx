import React, { forwardRef } from "react";
import styles from "./index.module.scss";

type TextFieldProps = {
    type?: "text" | "email" | "url" | "search" | "password";
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ type = "text", value, placeholder, onChange, ...props }, ref) => {
        return (
            <input
                ref={ref} //inputタグ要素をコンポーネント側に渡す
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={styles.textField}
                {...props}
            />
        );
    },
);
// displayNameを設定
TextField.displayName = "TextField";
