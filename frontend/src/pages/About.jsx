import { motion } from "framer-motion";
import "../ui/buttonUI.css";


function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
          About PhishAI
        </h1>


        <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong>PhishAI</strong> is an AI-powered phishing detection tool designed to help users
          identify suspicious URLs and emails before they become a threat.  
          Our mission is to make cybersecurity accessible, simple, and reliable for everyone.
        </p>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500 dark:text-blue-400">
            Meet the Developers 👩‍💻👨‍💻
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This project was built by a passionate team of students who believe technology can make
            the internet a safer place.  
            We’ve combined AI and web technologies to detect phishing attempts in real-time.
          </p>

          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Frontend & UI:</strong> Handled by <em>you</em> — ensuring a seamless and
              intuitive experience.
            </li>
            <li>
              <strong>Backend & AI Model:</strong> Built by your teammate — powering the core
              phishing detection intelligence.
            </li>
          </ul>
        </div>

        <div className="mt-8 text-gray-600 dark:text-gray-400">
          <p>
            🔒 <em>PhishAI</em> — because your safety online matters.
          </p>
        </div>
       
      </motion.div>
    </div>
  );
}

export default About;
