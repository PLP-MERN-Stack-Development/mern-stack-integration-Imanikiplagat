import { useState } from "react";
import { postService } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostForm() {  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    console.log("Submitting post:", formData);

    const cleanedData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      featuredImage: formData.image.trim(), // ✅ Include image URL here
    };

    try {
      await postService.createPost(cleanedData);
      setMessage("✅ Post created successfully!");
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        image: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      setMessage(
        `❌ Sorry, failed to create post: ${
          error.response?.data?.errors?.[0]?.msg || error.message
        }`
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-[#000000]">Create New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-[#1C1C1C] font-semibold mb-2">Post Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-[0.5px] border-[#E5E5E5] rounded-lg p-2 focus:ring-2 focus:ring-pink-600 text-[#1C1C1C] bg-white"
            placeholder="Enter post title"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-[#1C1C1C] font-semibold mb-2">Post Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            className="w-full border-[0.5px] border-[#E5E5E5] rounded-lg p-2 focus:ring-2 focus:ring-pink-600 text-[#1C1C1C] bg-white"
            placeholder="Write your post content..."
            required
          ></textarea>
        </div>

        {/* Author */}
        <div>
          <label className="block text-[#1C1C1C] font-semibold mb-2">Author ID</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border-[0.5px] border-[#E5E5E5] rounded-lg p-2 focus:ring-2 focus:ring-pink-600 text-[#1C1C1C] bg-white"
            placeholder="Enter author ID (MongoDB _id)"
            required
          />
          <p className="text-sm text-[#6C757D] mt-1">
            (You’ll later replace this with a user dropdown once auth is added.)
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[#1C1C1C] font-semibold mb-2">Category ID</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border-[0.5px] border-[#E5E5E5] rounded-lg p-2 focus:ring-2 focus:ring-pink-600 text-[#1C1C1C] bg-white"
            placeholder="Enter category ID (MongoDB _id)"
            required
          />
          <p className="text-sm text-[#6C757D] mt-1">
            (You can later replace this with a category dropdown.)
          </p>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-[#1C1C1C] font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border-[0.5px] border-[#E5E5E5] rounded-lg p-2 focus:ring-2 focus:ring-[#E63946] text-[#1C1C1C] bg-white"
            placeholder="Paste image URL"
          />
          <p className="text-sm text-[#6C757D] mt-1">
            (Leave blank to use default image.)
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-semibold py-2 rounded-lg hover:bg-[#D62828] transition"
        >
          Create Post
        </button>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-[#1C1C1C] font-medium">{message}</p>
      )}
    </div>
  );
}