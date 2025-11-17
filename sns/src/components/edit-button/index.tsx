"use client";

import React, { useState } from "react";
import { EditForm } from "@/components";
import Image from "next/image";

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
};

export const EditButton: React.FC<Props> = ({ post, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen}>
        <Image alt="編集ボタン" src="/images/edit.png" width={40} height={40} />
      </button>
      {isOpen && (
        <EditForm post={post} onUpdate={onUpdate} onClose={handleClose} />
      )}
    </>
  );
};
