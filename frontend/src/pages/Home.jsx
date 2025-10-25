import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext"; // Adjust import path as needed

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Features data
  const features = [
    {
      icon: "🔍",
      title: "Real-time URL Scanning",
      description: "Instant analysis of suspicious links with advanced AI algorithms to detect phishing attempts.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📧",
      title: "Email Threat Detection",
      description: "Comprehensive email analysis to identify phishing content, suspicious senders, and malicious attachments.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "🤖",
      title: "AI-Powered Analysis",
      description: "Machine learning models trained on millions of samples for unparalleled accuracy in threat detection.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "⚡",
      title: "Lightning Fast Results",
      description: "Get comprehensive security assessments in seconds, not minutes.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  // Stats data
  const stats = [
    { number: "99.8%", label: "Detection Accuracy", icon: "🎯" },
    { number: "50K+", label: "Daily Scans", icon: "📊" },
    { number: "0.2s", label: "Average Scan Time", icon: "⚡" },
    { number: "10K+", label: "Protected Users", icon: "🛡️" }
  ];

  // How it works steps
  const steps = [
    {
      step: "1",
      title: "Paste Content",
      description: "Enter the URL or email content you want to check",
      icon: "📥"
    },
    {
      step: "2",
      title: "AI Analysis",
      description: "Our advanced algorithms scan for threats in real-time",
      icon: "🔬"
    },
    {
      step: "3",
      title: "Get Results",
      description: "Receive detailed safety assessment and recommendations",
      icon: "📋"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }`}>
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          
        </motion.div>

        
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
            theme === 'dark' ? 'bg-blue-600' : 'bg-blue-200'
          }`}></div>
          <div className={`absolute -bottom-40 -left-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000 ${
            theme === 'dark' ? 'bg-purple-600' : 'bg-purple-200'
          }`}></div>
          <div className={`absolute top-40 left-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500 ${
            theme === 'dark' ? 'bg-cyan-600' : 'bg-cyan-200'
          }`}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm border shadow-lg mb-8 ${
              theme === 'dark'
                ? 'bg-gray-800/80 border-gray-600'
                : 'bg-white/80 border-gray-200'
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Trusted by 10,000+ users worldwide
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Stay Safe
            </span>
            <br />
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-800'}>
              From Phishing Attacks
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            AI-powered protection that detects and prevents phishing threats in real-time. 
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Secure your digital life with confidence.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/url-checker"
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <span className="text-xl">🔗</span>
              Scan URL Now
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>

            <Link
              to="/email-checker"
              className={`group relative backdrop-blur-sm border px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 ${
                theme === 'dark'
                  ? 'bg-gray-800/80 border-gray-600 text-white hover:bg-gray-700/80'
                  : 'bg-white/80 border-gray-200 text-gray-800 hover:bg-white'
              }`}
            >
              <span className="text-xl">📧</span>
              Check Email Safety
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-gray-800/70 border-gray-700/50'
                    : 'bg-white/70 border-white/50'
                }`}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className={`text-2xl md:text-3xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Powerful Protection Features
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Advanced AI technology working 24/7 to keep you safe from online threats
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700'
                  : 'bg-gradient-to-r from-white to-gray-50'
              }`} />
              <div className={`relative rounded-3xl p-6 shadow-lg border transition-all duration-300 group-hover:border-transparent h-full ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-100'
              }`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-gray-800 to-indigo-900/30'
          : 'bg-gradient-to-r from-blue-50 to-purple-50'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              How It Works
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Simple three-step process to secure your online presence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative text-center"
              >
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <div className={`rounded-3xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-100'
                }`}>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust PhishAI for real-time protection against phishing attacks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/url-checker"
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Scanning Free
            </Link>
            <Link
              to="/email-checker"
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={`max-w-7xl mx-auto px-6 py-8 text-center border-t ${
        theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
      }`}>
        <p>
          © 2024 PhishAI. Protecting your digital world with advanced AI technology.
        </p>
      </footer>
    </div>
  );
}