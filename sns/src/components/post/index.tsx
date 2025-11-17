import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { DeleteButton, EditButton } from "@/components";

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

type PostProps = {
  post: PostData;
  onDelete?: (id: number) => void;
  onModalOpen: () => void;
  onUpdate: (updatedPost: PostData) => void;
};

export const Post: React.FC<PostProps> = ({ post, onDelete, onUpdate }) => {
  function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // 月は0始まり
    const dd = String(date.getDate()).padStart(2, "0");

    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  }

  return (
    <div className={styles["post-box"]}>
      <div className={styles["post-item"]}>
        <Image
          src={`/images/${post.user.images}`}
          width={50}
          height={50}
          alt="user icon"
          style={{ width: "50px", height: "50px" }}
          priority
        />
        <div className={styles["post-text"]}>
          <div className={styles["post-detail"]}>
            <p>{post.user.username}</p>
            <p>{post.post}</p>
          </div>
          <p className={styles["created-at"]}>{formatDate(post.created_at)}</p>
        </div>
      </div>
      <div className={styles["post-actions"]}>
        <EditButton onUpdate={onUpdate} post={post} />
        <DeleteButton postID={post.id} onDelete={onDelete} />
      </div>
    </div>
  );
};
