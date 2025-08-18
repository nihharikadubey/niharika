import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FastDivider = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // Static divider for mobile (no animations)
  if (isMobile) {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-1">
          <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
          <div className="w-2 h-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>
          <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full"></div>
          <div className="w-6 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
        </div>
      </div>
    );
  }

  // Animated divider for desktop
  return (
    <motion.div 
      className="flex items-center justify-center mb-6 sm:mb-8"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
        <div className="w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
        <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>
        <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full"></div>
        <div className="w-10 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
      </div>
    </motion.div>
  );
};

export default FastDivider;