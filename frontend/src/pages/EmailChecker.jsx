import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../components/ThemeContext";
import { toast } from "react-toastify";

export default function EmailChecker() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { theme } = useContext(ThemeContext);
  const containerRef = useRef(null);

  // Mock analysis data for demonstration
  const mockAnalysis = {
    spamScore: 15,
    readability: 85,
    phishingRisk: 10,
    grammarScore: 90,
    sentiment: "positive",
    threats: ["Low spam probability", "Good grammar", "No suspicious links"],
    recommendations: ["Email appears safe to send", "Consider adding more personalization"],
    keywords: ["professional", "clear", "friendly"]
  };

  const handleCheck = async () => {
  if (!emailText.trim()) {
    toast.error("Please enter email content to analyze");
    return;
  }

  setIsLoading(true);
  setResult("");
  setAnalysis(null);

  try {
    // ✅ Your local FastAPI backend route (email)
    const response = await axios.post("https://phishai.onrender.com/predict/email", {
      email_text: emailText,
    });

    const data = response.data;
    console.log("Backend response:", data);

    const isSafe = data.label?.toLowerCase() === "safe";

    setResult(
      isSafe
        ? "✅ This email appears to be SAFE and legitimate."
        : "🚨 WARNING: This email may be SUSPICIOUS or contain phishing content!"
    );

    toast.success("Analysis complete!");
  } catch (error) {
    console.error("API Error:", error);
    setResult("❌ Error connecting to backend. Please try again.");
    toast.error("Backend connection failed!");
  } finally {
    setIsLoading(false);
  }
};


  const clearAll = () => {
    setEmailText("");
    setResult("");
    setAnalysis(null);
  };

  // Theme-based styles with purple theme
  const themeStyles = {
    light: {
      background: "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100",
      card: "bg-white/80 backdrop-blur-lg",
      text: {
        primary: "text-gray-800",
        secondary: "text-gray-600",
        muted: "text-gray-500"
      },
      border: "border-purple-200/50",
      input: "bg-white/90 border-purple-200 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm",
      button: {
        primary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg",
        secondary: "bg-gray-600 hover:bg-gray-700",
        outline: "border-purple-200 text-purple-700 hover:bg-purple-50"
      },
      result: {
        safe: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800",
        warning: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-800",
        danger: "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-800",
        metric: {
          blue: "bg-blue-50/80 text-blue-800 backdrop-blur-sm",
          purple: "bg-purple-50/80 text-purple-800 backdrop-blur-sm",
          orange: "bg-orange-50/80 text-orange-800 backdrop-blur-sm",
          green: "bg-green-50/80 text-green-800 backdrop-blur-sm",
          pink: "bg-pink-50/80 text-pink-800 backdrop-blur-sm"
        }
      }
    },
    dark: {
      background: "bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900",
      card: "bg-gray-800/80 backdrop-blur-lg",
      text: {
        primary: "text-gray-100",
        secondary: "text-gray-300",
        muted: "text-gray-400"
      },
      border: "border-purple-500/30",
      input: "bg-gray-700/90 border-purple-500/30 focus:ring-purple-400 focus:border-transparent placeholder-gray-400 backdrop-blur-sm",
      button: {
        primary: "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg",
        secondary: "bg-gray-500 hover:bg-gray-600",
        outline: "border-purple-500/30 text-purple-300 hover:bg-purple-900/30"
      },
      result: {
        safe: "bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700 text-green-200",
        warning: "bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border-yellow-700 text-yellow-200",
        danger: "bg-gradient-to-r from-red-900/50 to-pink-900/50 border-red-700 text-red-200",
        metric: {
          blue: "bg-blue-900/50 text-blue-200 backdrop-blur-sm",
          purple: "bg-purple-900/50 text-purple-200 backdrop-blur-sm",
          orange: "bg-orange-900/50 text-orange-200 backdrop-blur-sm",
          green: "bg-green-900/50 text-green-200 backdrop-blur-sm",
          pink: "bg-pink-900/50 text-pink-200 backdrop-blur-sm"
        }
      }
    }
  };

  const currentTheme = themeStyles[theme];

  // Safety indicator component
  const SafetyIndicator = ({ isSafe, size = "medium" }) => {
    const sizes = {
      small: "w-4 h-4",
      medium: "w-8 h-8",
      large: "w-16 h-16",
      xlarge: "w-24 h-24"
    };

    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`${sizes[size]} rounded-full flex items-center justify-center ${
          isSafe ? 'bg-green-500' : 'bg-red-500'
        } shadow-lg`}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white font-bold"
        >
          {isSafe ? '✓' : '!'}
        </motion.span>
      </motion.div>
    );
  };

  // 3D Card component
  const Card3D = ({ children, className = "" }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotate({ x: 0, y: 0 });
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`transform-gpu preserve-3d ${className}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    );
  };

  // Animated progress bar
  const AnimatedProgressBar = ({ value, color, delay = 0 }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay, duration: 1, ease: "easeOut" }}
        className={`h-3 rounded-full ${color} shadow-lg`}
      />
    </div>
  );

  // Sentiment indicator
  const SentimentIndicator = ({ sentiment }) => {
    const sentiments = {
      positive: { color: "bg-green-500", emoji: "😊", text: "Positive" },
      neutral: { color: "bg-yellow-500", emoji: "😐", text: "Neutral" },
      negative: { color: "bg-red-500", emoji: "😞", text: "Negative" }
    };

    const current = sentiments[sentiment] || sentiments.neutral;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3"
      >
        <div className={`w-8 h-8 rounded-full ${current.color} flex items-center justify-center text-white`}>
          {current.emoji}
        </div>
        <span className="font-semibold">{current.text}</span>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen ${currentTheme.background} py-12 px-4 transition-colors duration-500 relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className={`text-5xl md:text-6xl font-bold ${currentTheme.text.primary} mb-6`}
          >
            <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Email Security Analyzer
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${currentTheme.text.secondary} text-xl max-w-2xl mx-auto`}
          >
            AI-powered analysis to detect phishing attempts, spam indicators, and email security threats
          </motion.p>
        </motion.div>

        {/* Main Analyzer Card */}
        <Card3D className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`${currentTheme.card} rounded-3xl shadow-2xl p-8 border-2 ${currentTheme.border} transition-all duration-300 backdrop-blur-lg`}
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transform: 'translateZ(20px)'
            }}
          >
            {/* Email Input Section */}
            <div className="mb-8">
              <label className={`block text-lg font-semibold ${currentTheme.text.primary} mb-4 flex items-center`}>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3 text-2xl"
                >
                  📧
                </motion.span>
                Email Content
              </label>
              
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <textarea
                  placeholder="Paste your email content here to analyze for phishing attempts, spam indicators, and security threats..."
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  className={`${currentTheme.input} p-5 w-full rounded-2xl text-lg border-2 focus:ring-4 transition-all duration-300 shadow-lg h-48 resize-none`}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: emailText ? 1 : 0 }}
                  className="absolute right-4 top-4"
                >
                  <button
                    onClick={clearAll}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200 p-2"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: emailText ? 1 : 0 }}
                className="flex justify-between items-center mt-3 text-sm"
              >
                <span className={currentTheme.text.muted}>
                  {emailText ? `${emailText.split(/\s+/).length} words, ${emailText.length} characters` : 'Enter email content to analyze'}
                </span>
                <span className={currentTheme.text.muted}>
                  {emailText.length}/5000
                </span>
              </motion.div>
            </div>

            {/* Analyze Button */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheck}
              disabled={isLoading || !emailText.trim()}
              className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
                isLoading || !emailText.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : `${currentTheme.button.primary} text-white shadow-2xl`
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                  />
                  <span>Analyzing Email...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>🔍</span>
                  <span>Start Security Analysis</span>
                </div>
              )}
            </motion.button>
          </motion.div>
        </Card3D>

        {/* Results Section */}
        <AnimatePresence>
          {(result || analysis) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Safety Status Card */}
              <Card3D>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`rounded-3xl p-8 border-2 shadow-2xl backdrop-blur-lg ${
                    analysis?.isSafe 
                      ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/50' 
                      : 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-400/50'
                  }`}
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-3xl font-bold ${currentTheme.text.primary} flex items-center gap-4`}>
                      <SafetyIndicator isSafe={analysis?.isSafe} size="large" />
                      Security Status
                    </h3>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={`px-4 py-2 rounded-full font-semibold ${
                        analysis?.isSafe 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {analysis?.isSafe ? 'SAFE' : 'SUSPICIOUS'}
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-xl font-semibold mb-6 ${
                      analysis?.isSafe ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {result}
                  </motion.p>

                  {/* Email Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className={`p-4 rounded-2xl ${currentTheme.result.metric.blue}`}
                    >
                      <h4 className="font-semibold mb-3">Spam Score</h4>
                      <AnimatedProgressBar 
                        value={analysis?.spamScore || 0} 
                        color="bg-blue-500"
                        delay={0.5}
                      />
                      <span className="text-2xl font-bold mt-2 block">{analysis?.spamScore || 0}%</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className={`p-4 rounded-2xl ${currentTheme.result.metric.purple}`}
                    >
                      <h4 className="font-semibold mb-3">Readability</h4>
                      <AnimatedProgressBar 
                        value={analysis?.readability || 0} 
                        color="bg-purple-500"
                        delay={0.7}
                      />
                      <span className="text-2xl font-bold mt-2 block">{analysis?.readability || 0}%</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className={`p-4 rounded-2xl ${currentTheme.result.metric.orange}`}
                    >
                      <h4 className="font-semibold mb-3">Phishing Risk</h4>
                      <AnimatedProgressBar 
                        value={analysis?.phishingRisk || 0} 
                        color="bg-orange-500"
                        delay={0.9}
                      />
                      <span className="text-2xl font-bold mt-2 block">{analysis?.phishingRisk || 0}%</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      className={`p-4 rounded-2xl ${currentTheme.result.metric.green}`}
                    >
                      <h4 className="font-semibold mb-3">Grammar Score</h4>
                      <AnimatedProgressBar 
                        value={analysis?.grammarScore || 0} 
                        color="bg-green-500"
                        delay={1.1}
                      />
                      <span className="text-2xl font-bold mt-2 block">{analysis?.grammarScore || 0}%</span>
                    </motion.div>
                  </div>

                  {/* Additional Details */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <div className={`p-4 rounded-2xl ${currentTheme.result.metric.green}`}>
                      <h4 className="font-semibold mb-3">✅ Safety Check</h4>
                      <ul className="space-y-2 text-sm">
                        {(analysis?.threats || []).map((threat, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <span>✓</span> {threat}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-2xl ${currentTheme.result.metric.blue}`}>
                      <h4 className="font-semibold mb-3">💡 Recommendations</h4>
                      <ul className="space-y-2 text-sm">
                        {(analysis?.recommendations || []).map((rec, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 + index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <span>💡</span> {rec}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className={`p-4 rounded-2xl ${currentTheme.result.metric.pink}`}>
                      <h4 className="font-semibold mb-3">🎯 Sentiment</h4>
                      <SentimentIndicator sentiment={analysis?.sentiment} />
                      <div className="mt-3">
                        <h5 className="text-sm font-medium mb-2">Key Words:</h5>
                        <div className="flex flex-wrap gap-1">
                          {(analysis?.keywords || []).map((keyword, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.7 + index * 0.1 }}
                              className="px-2 py-1 bg-purple-500/20 rounded-full text-xs"
                            >
                              {keyword}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </Card3D>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="flex gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll}
                  className={`px-8 py-3 border-2 rounded-2xl font-semibold transition-all duration-300 ${currentTheme.button.outline}`}
                >
                  Analyze Another Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.clipboard.writeText(emailText)}
                  className={`px-8 py-3 text-white rounded-2xl font-semibold transition-all duration-300 ${currentTheme.button.primary}`}
                >
                  Copy Content
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <Card3D>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`${currentTheme.card} p-8 rounded-3xl shadow-2xl text-center border-2 ${currentTheme.border} backdrop-blur-lg`}
                  style={{ transform: 'translateZ(40px)' }}
                >
                  {/* Scanning Animation */}
                  <div className="relative mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="text-2xl">📧</span>
                    </motion.div>
                  </div>

                  <h3 className={`text-2xl font-bold ${currentTheme.text.primary} mb-4`}>
                    Analyzing Email
                  </h3>
                  <p className={currentTheme.text.secondary}>
                    Checking for phishing attempts and security threats...
                  </p>

                  {/* Scanning Steps */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 space-y-2 text-left"
                  >
                    {['Checking for phishing indicators', 'Analyzing spam patterns', 'Validating links and attachments', 'Assessing content safety'].map((step, index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.3 }}
                        className="flex items-center gap-3 text-sm"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: index * 0.5 }}
                          className="w-2 h-2 bg-purple-500 rounded-full"
                        />
                        <span className={currentTheme.text.secondary}>{step}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </Card3D>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}