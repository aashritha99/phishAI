import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mt-10"
    >
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome to PhishAI 🛡️
      </h1>
      <p className="text-gray-700 mb-6">
        AI-powered phishing URL and email detector to keep your digital life safe.
      </p>
      
      <div className="space-x-4">
        <Link
          to="/url-checker"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Check URL
        </Link>
        <Link
          to="/email-checker"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Check Email
        </Link>
      </div>
      
    </motion.div>
  );
}
