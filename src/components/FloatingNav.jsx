import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const sections = [
    { id: 'about', icon: '👤', label: 'About' },
    { id: 'work', icon: '💼', label: 'Experience' },
    { id: 'projects', icon: '🚀', label: 'Projects' },
    { id: 'tech', icon: '⚡', label: 'Skills' },
    { id: 'contact', icon: '📧', label: 'Contact' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Quick Nav Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-16 right-0 bg-slate-800/95 backdrop-blur-lg rounded-2xl p-2 border border-slate-700/50 shadow-xl mb-2"
              >
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
                  >
                    <span className="text-xl">{section.icon}</span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {section.label}
                    </span>
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sections.length * 0.05 }}
                  onClick={scrollToTop}
                  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group border-t border-slate-700/30 mt-2"
                >
                  <span className="text-xl">⬆️</span>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    Back to Top
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/30 transition-shadow duration-300"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl text-white"
            >
              {isOpen ? '✕' : '☰'}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;