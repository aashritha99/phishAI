import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContext, useRef, useEffect, useState } from "react";
import { ThemeContext } from "../components/ThemeContext";
import "../ui/buttonUI.css";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Liquid glass animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create liquid glass effect
      const gradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, 300
      );
      
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.15)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
        gradient.addColorStop(1, 'rgba(192, 132, 252, 0.02)');
      } else {
        gradient.addColorStop(0, 'rgba(192, 132, 252, 0.1)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0.01)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated blobs
      const blobs = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, size: 120 },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, size: 160 },
        { x: canvas.width * 0.4, y: canvas.height * 0.8, size: 100 }
      ];

      blobs.forEach((blob, index) => {
        const pulse = Math.sin(time + index) * 10;
        const blobGradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.size + pulse
        );
        
        if (theme === 'dark') {
          blobGradient.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
          blobGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        } else {
          blobGradient.addColorStop(0, 'rgba(192, 132, 252, 0.08)');
          blobGradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        }

        ctx.fillStyle = blobGradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.size + pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, mousePosition]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // ==================== SECTION 1: HERO ====================
  const heroStats = [
    { number: "99.8%", label: "Detection Accuracy", icon: "🎯" },
    { number: "50K+", label: "Daily Scans", icon: "📊" },
    { number: "0.2s", label: "Average Scan Time", icon: "⚡" },
    { number: "10K+", label: "Protected Users", icon: "🛡️" }
  ];

  // ==================== SECTION 2: FEATURES ====================
  const features = [
    {
      icon: "🔍",
      title: "Real-time URL Scanning",
      description: "Instant analysis of suspicious links with advanced AI algorithms to detect phishing attempts.",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      icon: "📧",
      title: "Email Threat Detection",
      description: "Comprehensive email analysis to identify phishing content, suspicious senders, and malicious attachments.",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: "🤖",
      title: "AI-Powered Analysis",
      description: "Machine learning models trained on millions of samples for unparalleled accuracy in threat detection.",
      gradient: "from-fuchsia-500 to-purple-600"
    },
    {
      icon: "⚡",
      title: "Lightning Fast Results",
      description: "Get comprehensive security assessments in seconds, not minutes.",
      gradient: "from-purple-400 to-indigo-500"
    }
  ];

  // ==================== SECTION 3: HOW IT WORKS ====================
  const workflowSteps = [
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

  // ==================== SECTION 4: TESTIMONIALS ====================
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Security Analyst",
      text: "PhishAI has reduced our phishing incidents by 95%. Incredible accuracy and speed!",
      avatar: "👩‍💼"
    },
    {
      name: "Mike Rodriguez",
      role: "IT Manager",
      text: "The real-time URL scanning has been a game-changer for our organization's security.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Watson",
      role: "Small Business Owner",
      text: "So easy to use yet powerful. Perfect for non-technical users like me!",
      avatar: "👩‍💼"
    }
  ];

  // ==================== SECTION 5: COMPARISON ====================
  const comparisonData = {
    withPhishAI: [
      "Real-time AI detection",
      "99.8% accuracy rate",
      "Instant results",
      "24/7 protection",
      "Detailed analytics"
    ],
    withoutPhishAI: [
      "Manual checking required",
      "Human error risk",
      "Time-consuming process",
      "Limited coverage",
      "No analytics"
    ]
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 overflow-hidden relative ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-100'
      }`}
      onMouseMove={handleMouseMove}
    >  
      {/* Liquid Glass Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: theme === 'dark' ? 0.6 : 0.4 }}
      />

      {/* ==================== HERO SECTION ==================== */}
      <section id="hero" className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative text-left"
            >
              {/* Trust Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`inline-flex items-center px-4 py-2 rounded-full backdrop-blur-lg border shadow-lg mb-8 ${
                  theme === 'dark'
                    ? 'bg-purple-900/30 border-purple-500/50'
                    : 'bg-white/80 border-purple-200'
                }`}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
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
                <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-serif">
                  Stay Safe
                </span>
                <br />
                <span className={theme === 'dark' ? 'text-white font-serif' : 'text-gray-800 font-serif'}>
                  From Phishing Attacks
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                AI-powered protection that detects and prevents phishing threats in real-time. 
                <span className={`font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                  {" "}Secure your digital life with confidence.
                </span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link
                  to="/url-checker"
                  className="group relative bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3 backdrop-blur-sm"
                >
                  <span className="text-xl">🔗</span>
                  Scan URL Now
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Link>

                <Link
                  to="/email-checker"
                  className={`group relative backdrop-blur-lg border px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 ${
                    theme === 'dark'
                      ? 'bg-purple-900/30 border-purple-500/30 text-white hover:bg-purple-800/40'
                      : 'bg-white/80 border-purple-200 text-purple-800 hover:bg-white'
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
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl"
              >
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`backdrop-blur-lg rounded-2xl p-4 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                      theme === 'dark'
                        ? 'bg-purple-900/20 border-purple-500/30'
                        : 'bg-white/70 border-purple-100'
                    }`}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className={`text-xl md:text-2xl font-bold mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {stat.number}
                    </div>
                    <div className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-purple-200' : 'text-purple-600'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 flex justify-center items-center mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative"
            >
              <div className={`relative rounded-3xl p-1 backdrop-blur-lg ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' 
                  : 'bg-gradient-to-r from-purple-200 to-pink-200'
              }`}>
                <img 
                  src="/3815440.jpg" 
                  alt="Phishing Protection Illustration" 
                  className="w-full max-w-lg rounded-2xl shadow-2xl object-cover backdrop-blur-sm"
                />
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute -top-4 -right-4 w-8 h-8 rounded-full backdrop-blur-lg flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-purple-500/30 border border-purple-400/50' 
                    : 'bg-purple-200/80 border border-purple-300'
                }`}
              >
                <span className="text-sm">🛡️</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className={`absolute -bottom-4 -left-4 w-12 h-12 rounded-full backdrop-blur-lg flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-violet-500/30 border border-violet-400/50' 
                    : 'bg-violet-200/80 border border-violet-300'
                }`}
              >
                <span className="text-lg">⚡</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="relative max-w-7xl mx-auto px-6 py-20 z-10">
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
              {/* Glass morphism background */}
              <div className={`absolute inset-0 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-900/40 to-violet-900/30'
                  : 'bg-gradient-to-br from-white/80 to-purple-50/60'
              } backdrop-blur-lg border ${
                theme === 'dark' ? 'border-purple-500/20' : 'border-purple-200/50'
              }`} />
              
              <div className="relative rounded-3xl p-6 h-full">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl text-white mb-6 transition-all duration-300 shadow-lg`}
                >
                  {feature.icon}
                </motion.div>
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

      {/* ==================== HOW IT WORKS SECTION ==================== */}
      <section id="how-it-works" className={`relative py-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-900/20 to-indigo-900/30'
          : 'bg-gradient-to-r from-purple-50/50 to-violet-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 z-10">
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
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative text-center group"
              >
                {/* Connecting line */}
                {index < workflowSteps.length - 1 && (
                  <div className={`hidden md:block absolute top-1/2 left-3/4 w-full h-0.5 ${
                    theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-300/50'
                  }`} />
                )}
                
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.step}
                </div>
                <div className={`relative rounded-3xl p-8 shadow-lg border transition-all duration-300 hover:shadow-xl backdrop-blur-lg ${
                  theme === 'dark'
                    ? 'bg-purple-900/20 border-purple-500/30'
                    : 'bg-white/80 border-purple-100'
                }`}>
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>
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

      {/* ==================== COMPARISON SECTION ==================== */}
      <section id="comparison" className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Why Choose PhishAI?
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            See the difference AI-powered protection makes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* With PhishAI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`relative rounded-3xl p-8 border-2 backdrop-blur-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/10 border-green-500/30'
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400/50'
            }`}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="text-4xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✅
              </motion.div>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                With PhishAI
              </h3>
            </div>
            <ul className="space-y-3">
              {comparisonData.withPhishAI.map((item, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Without PhishAI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`relative rounded-3xl p-8 border-2 backdrop-blur-lg ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-red-900/20 to-pink-900/10 border-red-500/30'
                : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-400/50'
            }`}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="text-4xl mb-2"
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ❌
              </motion.div>
              <h3 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                Without Protection
              </h3>
            </div>
            <ul className="space-y-3">
              {comparisonData.withoutPhishAI.map((item, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-3 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <span className="text-red-500">✗</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section id="testimonials" className={`relative py-20 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-purple-900/20 to-violet-900/20'
          : 'bg-gradient-to-r from-purple-50/50 to-violet-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Trusted by Users
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              See what our users say about PhishAI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-3xl p-6 shadow-lg border backdrop-blur-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-purple-900/20 border-purple-500/30'
                    : 'bg-white/80 border-purple-100'
                }`}
              >
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="text-3xl mr-4"
                    whileHover={{ scale: 1.2 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section id="cta" className="relative max-w-4xl mx-auto px-6 py-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-300 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust PhishAI for real-time protection against phishing attacks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/url-checker"
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
              >
                Start Scanning Free
              </Link>
              <Link
                to="/email-checker"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Analyze Email
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}