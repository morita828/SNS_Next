import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { deletePost } from "@/libs/post";

type PostProps = {
  postID  : number;
  userIcon: string;
  userName: string;
  content: string;
  createdAt: string;
};

export const Post: React.FC<PostProps> = ({ postID, userIcon, userName, content, createdAt }) => {

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
        <p>{createdAt}</p>
      </div>
      <div>
        <form action={deletePost}>
            <input type="hidden" name="id" value={postID} />
            <button
            className="text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded ml-2"
            onClick={}
            >
              削除
            </button>
          </form>
      </div>
    </div>
  );
};
