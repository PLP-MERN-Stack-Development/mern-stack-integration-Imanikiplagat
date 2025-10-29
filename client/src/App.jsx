import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <Router>
      <Header />
      {/* Main content area */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/newpost" element={<PostForm />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>

      {/* Footer stays outside the content container */}
      <Footer />
    </Router>
  );
}

export default App;