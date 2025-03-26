"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "./index.module.scss";

type PostFormProps = {
  placeholder?: string;
  maxLength?: number;
};

export const PostForm: React.FC<PostFormProps> = ({
  placeholder = "投稿内容を入力してください。",
  maxLength = 150,
}) => {
  const [text, setText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
      />
  );
};
