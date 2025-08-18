import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Blog from "./components/pages/Blog";
import Projects from "./components/pages/Projects";
function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
