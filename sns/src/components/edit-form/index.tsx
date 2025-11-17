"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

type User = {
  id: number;
  username: string;
  images: string;
};

type PostData = {
  id: number;
  user_id: number;
  post: string;
  user: User;
  created_at: any;
};

type Props = {
  post: PostData;
  onUpdate: (updatedPost: any) => void;
  onClose: () => void;
};

export const EditForm: React.FC<Props> = ({ post, onUpdate, onClose }) => {
  const [text, setText] = useState(post.post);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      setError("1文字以上入力してください。");
      return;
    }

    try {
      const res = await fetch(`/api/posts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: post.id, post: text }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "更新に失敗しました。");
        return;
      }

      const updatedPost = await res.json();

      onUpdate(updatedPost); // 親に更新データを渡す
      onClose(); // ★更新成功後にモーダルを閉じる
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました。");
    }
  };

  return (
    <div className={styles["edit-modal"]}>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={150}
            />
            <button type="submit">
              <Image
                src="/images/edit.png"
                width={40}
                height={40}
                alt="編集ボタン"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
