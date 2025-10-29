import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#FFFFFF] text-[#1C1C1C] border-b border-[#E5E5E5]">
      {/* Top section: Blog name + tagline + social icons */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide text-[#000000]">IMANI'S BLOG</h1>
          <p className="text-lg italic text-[#6C757D]">Stories that inspire, voices that matter</p>
        </div>
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] hover:text-[#D62828]"><FaFacebook size={24} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] hover:text-[#D62828]"><FaTwitter size={24} /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] hover:text-[#D62828]"><FaInstagram size={24} /></a>
          <a href="https://Pinterest.com" target="_blank" rel="noopener noreferrer" className="text-[#1C1C1C] hover:text-[#D62828]"><FaPinterest size={24} /></a>
        </div>
      </div>

      {/* Navbar section */}
      <nav className="bg-[#F8F9FA] text-[#1C1C1C] border-t border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-center gap-8 font-medium">
          <Link to="/" className="text-pink-600">Home</Link>
          <Link to="/newpost" className="hover:text-[#E63946]">New Post</Link>
        </div>
      </nav>
    </header>
  );
}