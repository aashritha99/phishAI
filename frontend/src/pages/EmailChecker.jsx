import { useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../components/ThemeContext"; 

export default function EmailChecker() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleCheck = async () => {
    if (!emailText.trim()) {
      setResult("Please enter some email content to analyze");
      return;
    }

    setIsLoading(true);
    setResult("");
    setAnalysis(null);

    try {
      const res = await axios.post("http://localhost:5000/api/email-check", { 
        text: emailText 
      });
      
      // Assuming the API returns more detailed analysis
      setAnalysis(res.data.analysis || {});
      setResult(res.data.message);
    } catch (error) {
      setResult("Error checking email content");
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setEmailText("");
    setResult("");
    setAnalysis(null);
  };

  // Theme-based styles
  const themeStyles = {
    light: {
      background: "bg-gradient-to-br from-blue-50 to-indigo-100",
      card: "bg-white",
      text: {
        primary: "text-gray-800",
        secondary: "text-gray-600",
        muted: "text-gray-500"
      },
      border: "border-gray-300",
      input: "bg-white border-gray-300 focus:ring-blue-500 focus:border-transparent",
      button: {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
        secondary: "bg-gray-600 hover:bg-gray-700",
        outline: "border-gray-300 text-gray-700 hover:bg-gray-50"
      },
      result: {
        success: "bg-green-50 border-green-200 text-green-800",
        metric: {
          blue: "bg-blue-50 text-blue-800",
          purple: "bg-purple-50 text-purple-800"
        }
      }
    },
    dark: {
      background: "bg-gradient-to-br from-gray-900 to-gray-800",
      card: "bg-gray-800",
      text: {
        primary: "text-gray-100",
        secondary: "text-gray-300",
        muted: "text-gray-400"
      },
      border: "border-gray-600",
      input: "bg-gray-700 border-gray-600 focus:ring-blue-400 focus:border-transparent placeholder-gray-400",
      button: {
        primary: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
        secondary: "bg-gray-500 hover:bg-gray-600",
        outline: "border-gray-600 text-gray-300 hover:bg-gray-700"
      },
      result: {
        success: "bg-green-900 border-green-700 text-green-200",
        metric: {
          blue: "bg-blue-900 text-blue-200",
          purple: "bg-purple-900 text-purple-200"
        }
      }
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`min-h-screen ${currentTheme.background} py-12 px-4 transition-colors duration-300`}>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>
            Email Content Analyzer
          </h1>
          <p className={`${currentTheme.text.secondary} text-lg`}>
            Check your email content for spam indicators, grammar issues, and engagement quality
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={`${currentTheme.card} rounded-2xl shadow-xl p-8 mb-8 border ${currentTheme.border} transition-colors duration-300`}
        >
          {/* Text Area */}
          <div className="mb-6">
            <label className={`block text-sm font-medium ${currentTheme.text.primary} mb-2`}>
              Email Content
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              placeholder="Paste your email content here to analyze for spam indicators, grammar, and overall quality..."
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              className={`${currentTheme.input} p-4 w-full rounded-xl mb-4 h-48 resize-none focus:ring-2 transition-all duration-200`}
            />
            
            <div className="flex justify-between items-center text-sm">
              <span className={currentTheme.text.muted}>{emailText.length} characters</span>
              <button
                onClick={clearAll}
                className="text-red-500 hover:text-red-400 transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheck}
              disabled={isLoading || !emailText.trim()}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                isLoading || !emailText.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : `${currentTheme.button.primary} text-white shadow-lg`
              }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : (
                "Analyze Email"
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {(result || analysis) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`${currentTheme.card} rounded-2xl shadow-xl p-8 border ${currentTheme.border} transition-colors duration-300`}
            >
              <h3 className={`text-2xl font-bold ${currentTheme.text.primary} mb-6 flex items-center`}>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-3 h-3 bg-green-500 rounded-full mr-3"
                />
                Analysis Results
              </h3>

              {/* Main Result */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`mb-6 p-4 border rounded-xl ${currentTheme.result.success}`}
              >
                <p className="font-medium">{result}</p>
              </motion.div>

              {/* Detailed Analysis (if available) */}
              {analysis && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Spam Score */}
                  <div className={`p-4 rounded-lg ${currentTheme.result.metric.blue}`}>
                    <h4 className="font-semibold mb-2">Spam Score</h4>
                    <div className={`w-full ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-200'} rounded-full h-2`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.spamScore || 0}%` }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="bg-blue-500 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-sm">{analysis.spamScore || 0}%</span>
                  </div>

                  {/* Readability */}
                  <div className={`p-4 rounded-lg ${currentTheme.result.metric.purple}`}>
                    <h4 className="font-semibold mb-2">Readability</h4>
                    <div className={`w-full ${theme === 'dark' ? 'bg-purple-700' : 'bg-purple-200'} rounded-full h-2`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${analysis.readability || 0}%` }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="bg-purple-500 h-2 rounded-full"
                      />
                    </div>
                    <span className="text-sm">{analysis.readability || 0}%</span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons for Results */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex gap-3 mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearAll}
                  className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${currentTheme.button.outline}`}
                >
                  Analyze Another Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigator.clipboard.writeText(emailText)}
                  className={`px-4 py-2 text-white rounded-lg transition-colors duration-200 ${currentTheme.button.secondary}`}
                >
                  Copy Content
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`${currentTheme.card} p-8 rounded-2xl shadow-2xl text-center border ${currentTheme.border}`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <h3 className={`text-xl font-semibold ${currentTheme.text.primary} mb-2`}>
                  Analyzing Email
                </h3>
                <p className={currentTheme.text.secondary}>Checking for spam indicators and quality metrics...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}