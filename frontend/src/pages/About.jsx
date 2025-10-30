import { motion } from "framer-motion";
import { useContext, useRef, useEffect, useState } from "react";
import { ThemeContext } from "../components/ThemeContext";
import "../ui/buttonUI.css";

function About() {
  const { theme } = useContext(ThemeContext);
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
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create liquid glass effect
      const gradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, 400
      );
      
      if (theme === 'dark') {
        gradient.addColorStop(0, 'rgba(147, 51, 234, 0.12)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
        gradient.addColorStop(1, 'rgba(192, 132, 252, 0.02)');
      } else {
        gradient.addColorStop(0, 'rgba(192, 132, 252, 0.08)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.04)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0.01)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated blobs
      const blobs = [
        { x: canvas.width * 0.1, y: canvas.height * 0.2, size: 80 },
        { x: canvas.width * 0.9, y: canvas.height * 0.7, size: 120 },
        { x: canvas.width * 0.3, y: canvas.height * 0.9, size: 60 }
      ];

      blobs.forEach((blob, index) => {
        const pulse = Math.sin(time + index * 2) * 8;
        const blobGradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.size + pulse
        );
        
        if (theme === 'dark') {
          blobGradient.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
          blobGradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        } else {
          blobGradient.addColorStop(0, 'rgba(192, 132, 252, 0.06)');
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

  const teamMembers = [
    {
      name: "Frontend Specialist",
      person:"A.N.Aashritha",
      role: "UI/UX Developer",
      description: "Crafting seamless and intuitive user experiences with modern web technologies",
      skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      emoji: "🎨"
    },
    {
      name: "AI Security Engineer",
      person:"Sneha Sah",
      role: "Backend & ML Developer",
      description: "Building intelligent phishing detection systems with advanced machine learning",
      skills: ["Python", "TensorFlow", "Node.js", "API Development"],
      emoji: "🤖"
    }
  ];

  const features = [
    {
      icon: "🔍",
      title: "Advanced Detection",
      description: "AI-powered algorithms trained on millions of phishing samples"
    },
    {
      icon: "⚡",
      title: "Real-time Analysis",
      description: "Instant scanning and threat assessment in under 0.2 seconds"
    },
    {
      icon: "🛡️",
      title: "Proactive Protection",
      description: "Prevent attacks before they happen with early threat detection"
    },
    {
      icon: "🌐",
      title: "Universal Access",
      description: "Free and accessible to everyone, making cybersecurity democratic"
    }
  ];

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 overflow-hidden relative ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900/10 to-indigo-900' 
          : 'bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50'
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Liquid Glass Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: theme === 'dark' ? 0.5 : 0.3 }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-lg border shadow-lg mb-6"
            style={{
              background: theme === 'dark' 
                ? 'rgba(147, 51, 234, 0.1)' 
                : 'rgba(192, 132, 252, 0.1)',
              borderColor: theme === 'dark' 
                ? 'rgba(168, 85, 247, 0.3)' 
                : 'rgba(168, 85, 247, 0.2)'
            }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-purple-200' : 'text-purple-700'
            }`}>
              Protecting 10,000+ Users Worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              About PhishAI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-xl md:text-2xl mb-8 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            <strong className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              PhishAI
            </strong> is an advanced AI-powered phishing detection platform designed to protect users from 
            sophisticated cyber threats in real-time.
          </motion.p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className={`rounded-3xl p-8 backdrop-blur-lg border shadow-xl ${
            theme === 'dark'
              ? 'bg-purple-900/20 border-purple-500/30'
              : 'bg-white/80 border-purple-200/50'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Our Mission 🎯
            </h2>
            <p className={`text-lg leading-relaxed text-center ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              To make <strong className="text-purple-500">advanced cybersecurity</strong> accessible, intuitive, 
              and reliable for everyone. We believe that protection against phishing attacks should be 
              <strong className="text-purple-500"> free, instant, and available to all</strong>, regardless of technical expertise.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Why Choose PhishAI? ✨
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`rounded-2xl p-6 backdrop-blur-lg border shadow-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-purple-900/20 border-purple-500/30'
                    : 'bg-white/80 border-purple-100'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-3xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className={`text-4xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Meet Our Team 👩‍💻👨‍💻
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className={`rounded-3xl p-8 backdrop-blur-lg border shadow-xl ${
                  theme === 'dark'
                    ? 'bg-purple-900/20 border-purple-500/30'
                    : 'bg-white/80 border-purple-200/50'
                }`}
              >
                <div className="text-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-5xl mb-4"
                  >
                    {member.emoji}
                  </motion.div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {member.person}
                  </h3>
                  <p className={`text-lg mb-4 ${
                    theme === 'dark' ? 'text-blue-300 font-bold' : 'text-blue-600 font-bold'
                  }`}>
                    {member.name}
                  </p>
                  <p className={`text-lg mb-4 ${
                    theme === 'dark' ? 'text-purple-300' : 'text-purple-600'
                  }`}>
                    {member.role}
                  </p>
                  <p className={`text-sm mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {member.description}
                  </p>
                </div>
                
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    TECHNOLOGIES:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          theme === 'dark'
                            ? 'bg-purple-800/50 text-purple-200'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`rounded-3xl p-8 text-center backdrop-blur-lg border ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-900/30 to-violet-900/30 border-purple-500/30'
                : 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200/50'
            }`}
          >
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Built by passionate students who believe that{" "}
              <strong className="text-purple-500">technology should make the internet safer for everyone</strong>. 
              We've combined cutting-edge AI with modern web technologies to create a powerful yet accessible 
              phishing detection tool.
            </p>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className={`rounded-3xl p-8 backdrop-blur-lg border ${
            theme === 'dark'
              ? 'bg-purple-900/20 border-purple-500/30'
              : 'bg-white/80 border-purple-200/50'
          }`}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              🔒
            </motion.div>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Our Commitment to Safety
            </h3>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <em>PhishAI</em> — because your safety online matters. We're committed to continuous 
              improvement and innovation in the fight against cyber threats.
            </p>
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className={`absolute top-1/4 left-10 w-6 h-6 rounded-full backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-purple-500/30 border border-purple-400/50' 
              : 'bg-purple-200/80 border border-purple-300'
          }`}
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className={`absolute bottom-1/3 right-12 w-8 h-8 rounded-full backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-violet-500/30 border border-violet-400/50' 
              : 'bg-violet-200/80 border border-violet-300'
          }`}
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          className={`absolute top-2/3 left-20 w-4 h-4 rounded-full backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-fuchsia-500/30 border border-fuchsia-400/50' 
              : 'bg-fuchsia-200/80 border border-fuchsia-300'
          }`}
        />
      </div>
    </div>
  );
}

export default About;