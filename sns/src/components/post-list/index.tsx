import { Post } from "@/components";

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
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={onDelete}
          onModalOpen={onModalOpen}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
