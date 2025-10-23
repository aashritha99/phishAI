import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ darkMode, toggleDarkMode }) => {
  // change HTML class when dark mode changes
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">PhishAI</h1>

      <nav className="flex gap-4">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">Home</Link>
        <Link to="/url" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">URL</Link>
        <Link to="/email" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">Email</Link>
        <Link to="/history" className="text-gray-700 dark:text-gray-200 hover:text-blue-500">History</Link>
      </nav>

      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
};

export default Header;
