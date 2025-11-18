"use client";

import { Post } from "@/components";
import { useSession } from "next-auth/react";

// 投稿データの型
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
  posts: PostData[];
  onDelete: (id: number) => void;
  onModalOpen: () => void;
  onUpdate: (updatedPost: PostData) => void;
};

export const PostList: React.FC<Props> = ({
  posts,
  onDelete,
  onModalOpen,
  onUpdate,
}) => {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id ?? null;

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onModalOpen={onModalOpen}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
