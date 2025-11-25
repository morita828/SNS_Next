"use client";

import React, { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { PostForm, PostList } from "@/components";

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
  };

  const handleUpdate = (updatedPost: PostData) => {
    setPosts((posts) =>
      posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  return (
    <div className={styles.contents}>
      <div className={styles["wrapper"]}>
        <div className={styles["inner"]}>
          <Image
            src="/images/icon1.png"
            alt="user icon"
            width={50}
            height={50}
            style={{ width: "50px", height: "50px" }}
            priority
          />
          <PostForm handleCreate={handleCreate} />
        </div>
      </div>
      <div>
        <PostList
          posts={posts}
          onDelete={handleDelete}
          onModalOpen={handleModalOpen}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
};
