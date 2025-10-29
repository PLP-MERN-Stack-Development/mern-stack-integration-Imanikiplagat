import { useParams, useNavigate } from "react-router-dom";
import { useFetchSinglePost } from "../hooks/useFetchSinglePost";
import { useState } from "react";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    post,
    loading,
    error,
    deletePost,
    addComment,
    actionLoading,
    commentLoading,
    editPost
  } = useFetchSinglePost(id);

  const [commentText, setCommentText] = useState("");

  const handleEdit = () => {
  // Option 1: Navigate to a separate edit page
  navigate(`/edit/${id}`);
  };


  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost();
      navigate("/");
    }
  };

const handleEditSubmit = async (e) => {
  e.preventDefault();
  console.log("Updating with:", formData); // ✅ This is the line you want
  await editPost(formData);
  setIsEditing(false);
};


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      await addComment(commentText);
      setCommentText("");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post 😢</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
{post.featuredImage && (
  <img
    src={`http://localhost:5000${post.featuredImage}`}
    alt="Post"
    className="w-full h-40 object-cover rounded-md"
  />
)}
      <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleEdit}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={actionLoading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        {post.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <div key={index} className="border-t pt-4 mt-4">
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mt-6 flex flex-col gap-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
          className="border p-3 rounded-md"
        />
        <button
          type="submit"
          disabled={commentLoading}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          {commentLoading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
}