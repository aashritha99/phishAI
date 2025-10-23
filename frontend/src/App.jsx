import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import URLChecker from "./pages/URLChecker";
import EmailChecker from "./pages/EmailChecker";
import History from "./pages/History";

function App() {
  const [theme, setTheme] = useState("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Navbar */}
        <nav
          className={`shadow-md ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
          }`}
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
    <img src="/logo2.png" alt="PhishAI Logo" className="w-18 h-10" />
    
  </div>

            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/url-checker" className="hover:underline">
                URL Checker
              </Link>
              <Link to="/email-checker" className="hover:underline">
                Email Checker
              </Link>
              <Link to="/history" className="hover:underline">
                History
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="ml-4 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
              >
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/url-checker" element={<URLChecker />} />
            <Route path="/email-checker" element={<EmailChecker />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer
          className={`text-center p-4 text-sm ${
            theme === "dark" ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-700"
          }`}
        >
          © {new Date().getFullYear()} PhishAI. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
