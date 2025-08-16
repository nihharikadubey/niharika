import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const greetings = [
    '. Namaste .',
    '* Hello *',
    '* Hola *',
    '* Bonjour *',
    '* 你好 *',
    '* こんにちは *',
    '* Ciao *',
    '* Привет *',
    '* Olá *',
    '* Hallo *',
    '* Welcome *'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => onLoadingComplete(), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 80); // Very fast cycling through greetings

    return () => clearInterval(interval);
  }, [onLoadingComplete, greetings.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Main greeting display */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.15,
              ease: "easeInOut"
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white text-center"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {greetings[currentIndex]}
          </motion.h1>
        </AnimatePresence>
        
        {/* Underline animation */}
        <motion.div
          className="h-[1px] bg-white/30 mt-4 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: isComplete ? 0 : "100%" }}
          transition={{ duration: greetings.length * 0.15, ease: "linear" }}
        />
      </div>

    </motion.div>
  );
};

export default LoadingScreen;