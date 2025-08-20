"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import { PostForm, PostList } from "@/components";

type User = {
  id: number;
  username: string;
  images: string | null;
};

type PostData = {
  id: number;
  user_id: number;
  post: string;
  user: User;
  created_at: any;
};

type Props = {
  mappedPosts: PostData[];
  opened?: boolean;
};

export const PostManager: React.FC<Props> = ({
  mappedPosts,
  opened = false,
}) => {
  const [posts, setPosts] = useState<PostData[]>(mappedPosts);
  const [isModalOpen, setIsModalOpen] = useState(opened);

  const handleCreate = (newPost: PostData) => {
    setPosts([newPost, ...posts]);
  };

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  return (
    <div className={styles.contents}>
      <div className={styles["wrapper"]}>
        <div className={styles["inner"]}>
          <img className={styles["icon"]} src="/images/icon1.png" alt="icon" />
          <PostForm handleCreate={handleCreate} />
        </div>
      </div>
      <div>
        <PostList
          posts={posts}
          onDelete={handleDelete}
          onModalOpen={handleModalOpen}
        />
      </div>
    </div>
  );
};
