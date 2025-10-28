import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ThemeContext } from "../components/ThemeContext";

// Enhanced navigation component
function Navigation({ theme, toggleTheme } = useContext(ThemeContext)) {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(null);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/url-checker", label: "URL Checker" },
    { path: "/email-checker", label: "Email Checker" },
    { path: "/about", label: "About"}
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const themeToggleVariants = {
    light: { 
      scale: 1,
      rotate: 0,
      backgroundColor:" rgba(255, 255, 255, 0.3)"
    },
    dark: { 
      scale: 1.1,
      rotate: 180,
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    hover: {
      scale: 1.15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      className="flex items-center space-x-2 md:space-x-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item) => (
        <motion.div
          key={item.path}
          className="relative"
          variants={itemVariants}
          whileHover="hover"
          onHoverStart={() => setIsHovered(item.path)}
          onHoverEnd={() => setIsHovered(null)}
        >
          <Link
            to={item.path}
            className={`
              relative flex items-center space-x-2 px-3 py-2 rounded-xl 
              transition-all duration-300 font-medium
              ${location.pathname === item.path
                ? theme === 'dark'
                  ? 'text-white bg-blue-600/20 border border-blue-500/30'
                  : 'text-white-700 bg-blue-600/20 border border-blue-500/30'
                : theme === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  : 'text-white-600 hover:text-white-400 hover:bg-gray-700/50'
              }
            `}
          >
            {/* Icon */}
            <motion.span
              animate={{ 
                rotate: location.pathname === item.path ? [0, 10, -10, 0] : 0 
              }}
              transition={{ duration: 0.5 }}
              className="text-sm"
            >
              {item.icon}
            </motion.span>
            
            {/* Label */}
            <span className="hidden sm:block">{item.label}</span>

            {/* Active Indicator */}
            <AnimatePresence>
              {location.pathname === item.path && (
                <motion.div
                  className={`absolute inset-0 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                  }`}
                  layoutId="activeNavItem"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1}}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            {/* Hover Effect */}
            <AnimatePresence>
              {isHovered === item.path && location.pathname !== item.path && (
                <motion.div
                  className={`absolute inset-0 rounded-xl ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </Link>

          {/* Floating Dot for Active Page */}
          <AnimatePresence>
            {location.pathname === item.path && (
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Enhanced Theme Toggle */}
      <motion.div
        variants={itemVariants}
        whileHover="hover"
      >
        <motion.button
          onClick={toggleTheme}
          className={`
            relative flex items-center justify-center w-14 h-8 rounded-full 
            backdrop-blur-md border shadow-lg overflow-hidden
            ${theme === 'dark' 
              ? 'bg-gray-800/40 border-gray-600/30' 
              : 'bg-white/40 border-white/30'
            }
          `}
          variants={themeToggleVariants}
          animate={theme === "dark" ? "dark" : "light"}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: theme === 'dark' 
                ? 'linear-gradient(45deg, #262424ff, #7e22ce)' 
                : 'linear-gradient(45deg, #60a5fa, #a78bfa)'
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Sun/Moon Icons */}
          <div className="relative z-10 flex items-center justify-between w-full px-2">
            <motion.span
              animate={{ 
                scale: theme === 'light' ? 1.2 : 0.8,
                opacity: theme === 'light' ? 1 : 0.5,
                rotate: theme === 'light' ? 0 : 90
              }}
              transition={{ duration: 0.3 }}
              className="text-xs"
            >
              ☀️
            </motion.span>
            
            <motion.span
              animate={{ 
                scale: theme === 'dark' ? 1.2 : 0.8,
                opacity: theme === 'dark' ? 1 : 0.5,
                rotate: theme === 'dark' ? 0 : -90
              }}
              transition={{ duration: 0.3 }}
              className="text-xs"
            >
              🌙
            </motion.span>
          </div>

          {/* Toggle Knob */}
          <motion.div
            className={`
              absolute top-1 w-6 h-6 rounded-full shadow-lg z-20
              ${theme === 'dark' 
                ? 'bg-yellow-300 left-7' 
                : 'bg-white left-1'
              }
            `}
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Alternative Compact Version for Mobile
function CompactNavigation({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/url-checker", label: "URL Checker" },
    { path: "/email-checker", label: "Email Checker"},
    { path: "/about", label: "About"}
  ];

  return (
    <div className="relative">
      {/* Hamburger Menu */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-2 rounded-xl backdrop-blur-md border shadow-lg
          ${theme === 'dark' 
            ? 'bg-gray-800/40 border-gray-600/30' 
            : 'bg-white/40 border-white/30'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? '✕' : '☰'}
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`
              absolute top-12 right-0 py-2 rounded-xl backdrop-blur-md border shadow-2xl
              ${theme === 'dark' 
                ? 'bg-gray-800/90 border-gray-600/50' 
                : 'bg-white/90 border-white/50'
              }
            `}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 w-48
                    transition-all duration-200 font-medium
                    ${location.pathname === item.path
                      ? theme === 'dark'
                        ? 'text-white bg-blue-600/20'
                        : 'text-blue-700 bg-blue-100'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full ml-auto"
                      layoutId="mobileActiveDot"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Theme Toggle in Dropdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="px-4 py-3 border-t border-gray-200 dark:border-gray-600"
            >
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between w-full text-left"
              >
                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
                <motion.div
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main Navigation Wrapper
export default function EnhancedNavigation({ theme, toggleTheme }) {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navigation theme={theme} toggleTheme={toggleTheme} />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <CompactNavigation theme={theme} toggleTheme={toggleTheme} />
      </div>
    </>
  );
}