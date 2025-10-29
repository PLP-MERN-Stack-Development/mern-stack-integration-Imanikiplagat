import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  // Fallback image if featuredImage is missing or not a full URL
  const imageSrc =
    post.featuredImage && post.featuredImage.startsWith("http")
      ? post.featuredImage
      : "https://picsum.photos/id/1015/600/400";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageSrc}
        alt={post.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mt-2 line-clamp-3">
          {post.content.slice(0, 100)}...
        </p>
        <Link to={`/posts/${post._id}`} className="text-pink-500 mt-4 block">
          Read more →
        </Link>
      </div>
    </div>
  );
}