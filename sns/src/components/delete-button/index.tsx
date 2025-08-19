"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

type Props = {
  postID: number;
  onDelete?: (id: number) => void; // 削除後に一覧をリロードする用
};

export const DeleteButton: React.FC<Props> = ({ postID, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!window.confirm("本当に削除しますか？")) return;
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postID }),
      });

      if (!res.ok) {
        console.error("削除に失敗しました");
        return;
      }

      // 親コンポーネントに通知
      onDelete?.(postID);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 削除ボタン */}
      <button onClick={handleClick}>
        <Image
          className={styles["delete-button"]}
          alt="削除ボタン"
          src="/images/trash.png"
          width={24}
          height={24}
        />
      </button>
    </>
  );
};
