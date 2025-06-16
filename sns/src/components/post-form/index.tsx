"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

export const PostForm = () => {
  const { data: session } = useSession(); // ← セッションからユーザー取得
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value.length > 0) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      setError("1文字以上入力してください。");
      return;
    }

    // セッション確認
    if (!session?.user?.id) {
      redirect("/logout/login");
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: text,
          userId: session.user.id, // ← セッションから取得したIDを送信
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "投稿に失敗しました。");
        return;
      }

      setText(""); // 成功したら入力をクリア
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputArea}>
        <textarea
          className={styles.textarea}
          placeholder="投稿内容を入力してください。"
          value={text}
          onChange={handleChange}
          maxLength={150}
        />
        <button className={styles["image-button"]}>
          <Image
            src="/images/post.png"
            width={25}
            height={25}
            alt="post-icon"
            style={{ width: "50px", borderRadius: "10%" }}
            priority
          />
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
