export default function Card({ post }) {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {post.description || post.content?.substring(0, 100) + "..."}
        </p>
        <p className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
