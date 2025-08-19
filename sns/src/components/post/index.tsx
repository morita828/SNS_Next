import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { DeleteButton } from "@/components";

type PostProps = {
  postID: number;
  userIcon: string;
  userName: string;
  content: string;
  createdAt: string;
  onDelete?: (id: number) => void;
};

export const Post: React.FC<PostProps> = ({
  postID,
  userIcon,
  userName,
  content,
  createdAt,
  onDelete,
}) => {
  return (
    <div className={styles["post-box"]}>
      <div className={styles["post-item"]}>
        <Image
          src={userIcon}
          width={50}
          height={50}
          alt="user icon"
          style={{ width: "50px", height: "50px" }}
          priority
        />
        <div className={styles["post-detail"]}>
          <p>{userName}</p>
          <p>{content}</p>
        </div>
        <p className={styles["created-at"]}>{createdAt}</p>
      </div>
      <div>
        <DeleteButton postID={postID} onDelete={onDelete} />
      </div>
    </div>
  );
};
