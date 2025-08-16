import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AnimatedCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const cursorRef = useRef(null);
  
  // Motion values for smooth cursor movement
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };
  
  // Smooth spring animation
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX);
      mouse.y.set(clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check if element is interactive
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovered(true);
        
        // Get element position and size for morphing effect
        const rect = target.getBoundingClientRect();
        setHoveredElement({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    };

    const handleMouseOut = (e) => {
      setIsHovered(false);
      setHoveredElement(null);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.body.style.cursor = 'auto';
    };
  }, [mouse.x, mouse.y]);

  // Don't show on mobile/touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main blob cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] mix-blend-difference"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 40 : 20,
          height: isHovered ? 40 : 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div 
          className="w-full h-full rounded-full"
          style={{
            background: isHovered 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(255, 255, 255, 1)',
            filter: isHovered ? 'blur(4px)' : 'blur(0px)',
            transition: 'all 0.2s ease'
          }}
        />
      </motion.div>

      {/* Morphing outline when hovering */}
      {isHovered && hoveredElement && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: hoveredElement.x,
            y: hoveredElement.y,
            width: hoveredElement.width,
            height: hoveredElement.height,
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.5,
          }}
          style={{
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Trailing dot for better visibility */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 1,
        }}
      >
        <div 
          className="w-1 h-1 rounded-full bg-white"
          style={{
            opacity: isHovered ? 0 : 0.8,
            transition: 'opacity 0.2s ease'
          }}
        />
      </motion.div>
    </>
  );
};

export default AnimatedCursor;