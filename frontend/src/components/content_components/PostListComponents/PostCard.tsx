
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}