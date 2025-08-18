import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollBarRef = useRef(null);
  const thumbRef = useRef(null);

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollBarRef.current) return;

    const rect = scrollBarRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (percentage / 100) * totalHeight;
    
    window.scrollTo({
      top: scrollTo,
      behavior: 'auto'
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !scrollBarRef.current) return;

    const rect = scrollBarRef.current.getBoundingClientRect();
    const y = e.touches[0].clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (percentage / 100) * totalHeight;
    
    window.scrollTo({
      top: scrollTo,
      behavior: 'auto'
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // Handle click on track
  const handleTrackClick = (e) => {
    if (e.target === thumbRef.current) return;
    
    const rect = scrollBarRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = (y / rect.height) * 100;
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (percentage / 100) * totalHeight;
    
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
  };


  return (
    <>
      {/* Desktop Scroll Bar - More visible */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-blue-600/10 blur-xl rounded-full" />
          
          {/* Scroll track */}
          <div
            ref={scrollBarRef}
            onClick={handleTrackClick}
            className="relative w-2 h-[70vh] max-h-[600px] bg-slate-800/50 backdrop-blur-sm rounded-full cursor-pointer overflow-hidden border border-slate-700/50 shadow-lg hover:bg-slate-800/60 transition-all duration-200"
          >
            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400/60 to-blue-500/60 rounded-full transition-all duration-100 shadow-inner"
              style={{ height: `${scrollProgress}%` }}
            />
            
            {/* Draggable thumb */}
            <motion.div
              ref={thumbRef}
              className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-xl border border-white/20 cursor-grab ${
                isDragging ? 'cursor-grabbing scale-150' : ''
              }`}
              style={{ top: `${scrollProgress}%`, transform: 'translate(-50%, -50%)' }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              whileHover={{ scale: 1.4 }}
              animate={{
                boxShadow: isDragging
                  ? '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.4)'
                  : '0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(6, 182, 212, 0.2)'
              }}
            />
            
            {/* Top indicator */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400/50 rounded-full" />
            
            {/* Bottom indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500/50 rounded-full" />
          </div>
          
          {/* Percentage indicator on hover */}
          {isDragging && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-full ml-3 px-2 py-1 bg-slate-800/90 backdrop-blur-sm rounded-lg text-cyan-400 text-xs font-medium border border-cyan-400/20"
              style={{ top: `${scrollProgress}%`, transform: 'translateY(-50%)' }}
            >
              {Math.round(scrollProgress)}%
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile progress bar - subtle at top */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-slate-900/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20 transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default ScrollBar;