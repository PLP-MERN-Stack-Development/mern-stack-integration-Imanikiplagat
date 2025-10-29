export default function Footer() {
  return (
    <footer className="bg-[#F8F9FA] border-t border-[#E5E5E5] text-[#6C757D] py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>&copy; {new Date().getFullYear()} IMANI'S BLOG. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E63946]">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E63946]">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E63946]">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E63946]">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}