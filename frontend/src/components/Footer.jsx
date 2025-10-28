import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { motion } from "framer-motion";

export default function Footer() {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-400"
          : "bg-gray-50 border-gray-200 text-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Left: Logo + Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-18 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-md">
                <img src="/logo2.png" alt="PhishAI Logo" className="w-18 h-10" />
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              AI-powered protection against phishing threats.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-base text-blue-600 dark:text-blue-400">
              Quick Links
            </h3>
            <a
              href="/url-checker"
              className="hover:text-blue-500 transition-colors text-sm"
            >
              🔗 URL Scanner
            </a>
            <a
              href="/email-checker"
              className="hover:text-blue-500 transition-colors text-sm"
            >
              📧 Email Checker
            </a>
            <a
              href="/history"
              className="hover:text-blue-500 transition-colors text-sm"
            >
              📜 Scan History
            </a>
            <a
              href="/about"
              className="hover:text-blue-500 transition-colors text-sm"
            >
              👥 About Us
            </a>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold text-base text-blue-600 dark:text-blue-400">
              Contact Us
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span>📧</span>
              <a
                href="mailto:support@phishai.com"
                className="hover:text-blue-500 transition-colors"
              >
                support@phishai.com
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span>📞</span>
              <a
                href="tel:+11234567890"
                className="hover:text-blue-500 transition-colors"
              >
                +1 (123) 456-7890
              </a>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          className={`border-t my-4 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        ></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} PhishAI. All rights reserved.</p>

          <div className="flex space-x-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}