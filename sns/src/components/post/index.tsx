import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

type PostProps = {
  userIcon: string;
  userName: string;
  content : string;
};

export const Post: React.FC<PostProps> = ({ userIcon, userName, content }) => {
  return (
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
    </div>
  );
};
