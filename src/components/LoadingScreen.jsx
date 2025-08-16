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
          setTimeout(() => onLoadingComplete(), 50);
          return prev;
        }
        return prev + 1;
      });
    }, 40); // Ultra fast - no delay

    return () => clearInterval(interval);
  }, [onLoadingComplete, greetings.length]);

  return (
    <>
      {/* Curtain effect - Left side */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ 
          x: '-100%',
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.1
        }}
        className="fixed top-0 left-0 w-1/2 h-full z-[100] bg-black border-r border-white/10"
        style={{
          backgroundImage: 'linear-gradient(90deg, #000 0%, #0a0a0a 100%)',
          boxShadow: 'inset -2px 0 20px rgba(255,255,255,0.05)'
        }}
      />
      
      {/* Curtain effect - Right side */}
      <motion.div
        initial={{ x: 0 }}
        exit={{ 
          x: '100%',
        }}
        transition={{ 
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.1
        }}
        className="fixed top-0 right-0 w-1/2 h-full z-[100] bg-black border-l border-white/10"
        style={{
          backgroundImage: 'linear-gradient(-90deg, #000 0%, #0a0a0a 100%)',
          boxShadow: 'inset 2px 0 20px rgba(255,255,255,0.05)'
        }}
      />
      
      {/* Decorative center line that splits */}
      <motion.div
        initial={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={{ 
          duration: 0.6,
          ease: "easeInOut"
        }}
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full z-[102] bg-gradient-to-b from-transparent via-white/30 to-transparent"
      />
      
      {/* Main loading content */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        exit={{ 
          opacity: 0,
          scale: 0.95
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        className="fixed inset-0 z-[101] flex items-center justify-center overflow-hidden pointer-events-none"
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
                duration: 0.05,
                ease: "easeOut"
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
            transition={{ duration: greetings.length * 0.04, ease: "linear" }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default LoadingScreen;