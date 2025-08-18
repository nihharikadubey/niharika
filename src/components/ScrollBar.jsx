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
      {/* Desktop Scroll Bar */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-50">
        <div className="flex items-center gap-4">
          {/* Section indicators */}
          <div className="flex flex-col gap-3">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => navigateToSection(section.id)}
                className={`group relative flex items-center justify-center transition-all duration-300 ${
                  activeSection === section.id ? 'scale-110' : 'scale-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50'
                  }`}
                >
                  <span className="text-sm">{section.icon}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-3 py-1 bg-slate-800 rounded-lg text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
                  {section.name}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="border-8 border-transparent border-l-slate-800"></div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Scroll track */}
          <div
            ref={scrollBarRef}
            onClick={handleTrackClick}
            className="relative w-1 h-[400px] bg-slate-800/30 rounded-full cursor-pointer overflow-hidden"
          >
            {/* Progress fill */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500/30 to-blue-600/30 rounded-full transition-all duration-100"
              style={{ height: `${scrollProgress}%` }}
            />
            
            {/* Draggable thumb */}
            <motion.div
              ref={thumbRef}
              className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg cursor-grab ${
                isDragging ? 'cursor-grabbing scale-125' : ''
              }`}
              style={{ top: `${scrollProgress}%`, transform: 'translate(-50%, -50%)' }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              whileHover={{ scale: 1.2 }}
              animate={{
                boxShadow: isDragging
                  ? '0 0 20px rgba(6, 182, 212, 0.5)'
                  : '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/50">
        <div className="flex justify-around items-center py-2">
          {sections.slice(0, 5).map((section) => (
            <button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="text-xs">{section.name}</span>
            </button>
          ))}
        </div>
        
        {/* Mobile progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-800/30">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default ScrollBar;