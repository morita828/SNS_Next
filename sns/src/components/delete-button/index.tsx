"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  postID: number;
  onDelete?: (id: number) => void; // 削除後に一覧をリロードする用
};

export const DeleteButton: React.FC<Props> = ({ postID, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const handleClick = async () => {
    if (!window.confirm("この投稿を削除します。よろしいでしょうか？")) return;
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

      router.refresh();

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
          alt="削除ボタン"
          src={isHover ? "/images/trash-h.png" : "/images/trash.png"}
          width={40}
          height={40}
          unoptimized
        />
      </button>
    </>
  );
};
