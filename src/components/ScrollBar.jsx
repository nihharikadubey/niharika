import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const scrollBarRef = useRef(null);
  const thumbRef = useRef(null);

  const sections = [
    { id: 'hero', name: 'Home', icon: '🏠' },
    { id: 'about', name: 'About', icon: '👤' },
    { id: 'work', name: 'Experience', icon: '💼' },
    { id: 'tech', name: 'Skills', icon: '⚡' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'currently-learning', name: 'Learning', icon: '📚' },
    { id: 'contact', name: 'Contact', icon: '📧' },
  ];

  // Update scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Find active section
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
          }
        }
      });
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

  // Navigate to section
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Scroll Bar - Simple draggable only */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        {/* Scroll track */}
        <div
          ref={scrollBarRef}
          onClick={handleTrackClick}
          className="relative w-1.5 h-[60vh] max-h-[500px] bg-slate-800/20 rounded-full cursor-pointer overflow-hidden hover:bg-slate-800/30 transition-colors duration-200"
        >
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500/40 to-blue-600/40 rounded-full transition-all duration-100"
            style={{ height: `${scrollProgress}%` }}
          />
          
          {/* Draggable thumb */}
          <motion.div
            ref={thumbRef}
            className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg cursor-grab ${
              isDragging ? 'cursor-grabbing scale-125' : ''
            }`}
            style={{ top: `${scrollProgress}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            whileHover={{ scale: 1.3 }}
            animate={{
              boxShadow: isDragging
                ? '0 0 25px rgba(6, 182, 212, 0.6)'
                : '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}
          />
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