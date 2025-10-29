import { useParams, useNavigate } from "react-router-dom";
import { useFetchSinglePost } from "../hooks/useFetchSinglePost";
import { useState, useEffect } from "react";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    post,
    loading,
    error,
    editPost,
    actionLoading
  } = useFetchSinglePost(id);

  const [formData, setFormData] = useState({ title: "", content: "" });

  // Pre-fill form when post is loaded
  useEffect(() => {
    if (post) {
      setFormData({ title: post.title, content: post.content });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating with:", formData);
    try {
      await editPost(formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post 😢</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Post title"
          className="w-full p-3 border rounded"
        />
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Post content"
          rows="8"
          className="w-full p-3 border rounded"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={actionLoading}
            className="bg-pink-600 text-white px-6 py-2 rounded"
          >
            {actionLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="bg-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}