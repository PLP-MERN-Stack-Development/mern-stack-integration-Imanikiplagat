import { useState, useEffect } from "react";
import { postService } from "../services/api";
import PostCard from "../components/PostCard";
import CategoryBar from "../components/CategoryBar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);  
    const filteredPosts = selectedCategory
    ? posts.filter(
      (post) => post.category && post.category._id === selectedCategory)
    : posts;
  
  // Fetch all posts on initial load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data);

        console.log("POSTS FROM API:", data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Reset posts when searchTerm is cleared
  useEffect(() => {
    const fetchAll = async () => {
      if (searchTerm.trim() === "") {
        try {
          setLoading(true);
          const data = await postService.getAllPosts();
          setPosts(data);
          setLoading(false);
        } catch (err) {
          console.error("Error resetting posts:", err);
          setError(true);
          setLoading(false);
        }
      }
    };
    fetchAll();
  }, [searchTerm]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const results = await postService.searchPosts(searchTerm);
      setPosts(results);
      setLoading(false);
    } catch (err) {
      console.error("Search failed:", err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen px-6 py-10">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-8">
        <img
          src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg"
          alt="Welcome to Imani's Blog"
          className="rounded-lg shadow-md w-full md:w-1/2"
        />
        <div className="md:w-1/2 text-[#1C1C1C]">
          <h2 className="text-3xl font-bold text-[#000000] mb-4">Welcome to IMANI'S BLOG</h2>
          <p className="text-lg text-[#6C757D]">
            IMANI'S BLOG is a space for stories that inspire, voices that matter, and reflections that resonate.
            Whether you're here to learn, connect, or simply enjoy thoughtful writing
          </p>
          <p className="text-lg text-pink-400"> — you're in the right place.</p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border-[0.2px] border-pink-500 rounded-md focus:outline-none focus:ring-[#E63946] text-[#1C1C1C] bg-white"
          />
        </form>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-sm text-pink-600 underline mt-2"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Posts Section */}
      {loading && <p>Loading...</p>}
      {error && <p>Error loading posts 😢</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-gray-500">No posts found for "{searchTerm}"</p>
      )}
      {!loading && !error && posts.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}    

    </div>
  );
}