import { useState, useEffect } from "react";
import axios from "axios";

export default function CategoryBar({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state for post creation
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/");
        console.log("Fetched categories:", res.data);
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err.response?.data || err.message);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      author,
      category,
      featuredImage: imageUrl,
    };

    try {
      await axios.post("http://localhost:5000/api/posts", postData);
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setAuthor("");
      setCategory("");
      setImageUrl("");
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search categories..."
        className="w-full p-2 border rounded"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onSelectCategory(cat._id)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
            >
              {cat.name}
            </button>
          ))
        ) : (
          <p className="text-sm text-gray-500">No matching categories found.</p>
        )}
      </div>

      {/* ✅ Post Creation Form */}
      <form onSubmit={handleCreatePost} className="mt-8 space-y-3">
        <h3 className="text-lg font-semibold">Create a New Post</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {/* ✅ Category Dropdown */}
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full p-2 border rounded"
>
  <option value="">Select a category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}