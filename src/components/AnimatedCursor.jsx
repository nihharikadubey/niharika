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
      let target = e.target;
      
      // Traverse up to find the actual interactive element
      while (target && target !== document.body) {
        // Check if element is interactive
        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          // Check for parent elements that might be clickable
          target.onclick ||
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
          return;
        }
        
        // Check for special cases like tech badges
        if (
          target.classList.contains('px-4') && 
          target.classList.contains('py-2') && 
          target.classList.contains('rounded-full')
        ) {
          setIsHovered(true);
          const rect = target.getBoundingClientRect();
          setHoveredElement({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          });
          return;
        }
        
        // Check for image containers
        if (target.tagName === 'IMG' || target.querySelector('img')) {
          const parentLink = target.closest('a');
          if (parentLink) {
            setIsHovered(true);
            const rect = parentLink.getBoundingClientRect();
            setHoveredElement({
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height
            });
            return;
          }
        }
        
        target = target.parentElement;
      }
    };

    const handleMouseOut = () => {
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

      {/* Main blob cursor - increased size */}
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
          width: isHovered ? 0 : 32,  // Hide when hovering
          height: isHovered ? 0 : 32,  // Hide when hovering
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-white"
        />
      </motion.div>

      {/* Morphing outline when hovering - no blur, full wrap */}
      {isHovered && hoveredElement && (
        <motion.div
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: hoveredElement.x - 8,  // Add padding
            y: hoveredElement.y - 8,  // Add padding
            width: hoveredElement.width + 16,  // Add padding
            height: hoveredElement.height + 16,  // Add padding
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.5,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              border: '2px solid white',
              borderRadius: '12px',
              background: 'transparent',
            }}
          />
        </motion.div>
      )}

      {/* Center dot cursor - always visible */}
      <motion.div
        className="fixed pointer-events-none z-[10001] mix-blend-difference"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 20,
          mass: 0.3,
        }}
      >
        <div 
          className="w-2 h-2 rounded-full bg-white"
        />
      </motion.div>
    </>
  );
};

export default AnimatedCursor;