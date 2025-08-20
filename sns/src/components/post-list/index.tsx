import { Post } from "@/components";

// 投稿データの型
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
  posts: PostData[];
  onDelete: (id: number) => void;
  onModalOpen: () => void;
};

export const PostList: React.FC<Props> = ({ posts, onDelete, onModalOpen }) => {
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
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          postID={post.id}
          userIcon={`/images/${post.user.images}`}
          userName={post.user.username}
          content={post.post}
          createdAt={formatDate(post.created_at)}
          onDelete={onDelete}
          onModalOpen={onModalOpen}
        />
      ))}
    </div>
  );
};
