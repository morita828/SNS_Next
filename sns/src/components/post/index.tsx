import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

type PostProps = {
  userName: string;
  content: string;
  userIcon?: string;
};

const Post: React.FC<PostProps> = ({ userName, content, userIcon = "/images/icon1.png" }) => {
  return (
    <div className={styles["post-item"]}>
      <Image
        src={userIcon}
        width={50}
        height={50}
        alt="icon"
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
