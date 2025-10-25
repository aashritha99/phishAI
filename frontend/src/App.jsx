import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./components/ThemeContext.jsx"; // make sure file extension matches
import Home from "./pages/Home.jsx";
import URLChecker from "./pages/URLChecker.jsx";
import EmailChecker from "./pages/EmailChecker.jsx";
import History from "./pages/History.jsx";

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
  className={`shadow-md rounded-3xl ${
    theme === "dark"
      ? "bg-gradient-to-r from-[#2e026d] via-[#3b0764] to-[#581c87] text-white shadow-xl"
      : "bg-gradient-to-r dark:from-[#3b0764] dark:via-[#4c1d95] dark:to-[#1e1b4b] text-white"
  }`}
>


          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/logo2.png" alt="PhishAI Logo" className="w-18 h-10" />
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/url-checker" className="hover:underline">URL Checker</Link>
              <Link to="/email-checker" className="hover:underline">Email Checker</Link>
              <Link to="/history" className="hover:underline">History</Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-4 relative inline-flex items-center justify-center w-12 h-6 bg-white/20 backdrop-blur-md rounded-full transition-all duration-300 hover:bg-white/30"
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    theme === "dark"
                      ? "translate-x-6 bg-yellow-400"
                      : "translate-x-0 bg-gray-100"
                  }`}
                ></span>
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
            theme === "dark"
              ? "bg-gray-800 text-gray-400"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          © {new Date().getFullYear()} PhishAI. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
