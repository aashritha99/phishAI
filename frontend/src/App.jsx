import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./components/ThemeContext.jsx";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import URLChecker from "./pages/URLChecker.jsx";
import EmailChecker from "./pages/EmailChecker.jsx";
import About from "./pages/About.jsx";
import Footer from "./components/Footer.jsx";

// ✅ Import toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div
        className={`min-h-screen flex flex-col transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Navbar */}
        <nav
          className={`shadow-md ${
            theme === "dark"
              ? "bg-gradient-to-r from-[#2e026d] via-[#3b0764] to-[#581c87] text-white shadow-xl"
              : "bg-gradient-to-r dark:from-[#3b0764] dark:via-[#4c1d95] dark:to-[#1e1b4b] text-white"
          }`}
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/logo2.png" alt="PhishAI Logo" className="w-18 h-10" />
            </div>
            <Navigation toggleTheme={toggleTheme} theme={theme} />
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/url-checker" element={<URLChecker />} />
            <Route path="/email-checker" element={<EmailChecker />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer
          className={`text-center p-4 text-sm ${
            theme === "dark"
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-200 text-gray-700"
          }`}
        />
      </div>

      {/* ✅ Toast notification container (no UI change) */}
      <ToastContainer position="top-right" autoClose={3000} theme={theme} />
    </Router>
  );
}

export default App;
