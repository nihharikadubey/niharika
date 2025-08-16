import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { styles } from '../styles';
import { isMobile, shouldReduceMotion } from '../utils/deviceDetect';

// ===== GLOBAL SCROLLBAR STYLES =====
const GlobalScrollbarStyles = () => (
  <style jsx global>{`
    /* Custom Scrollbar Styles - Oceanic Theme */
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.8);
      border-radius: 8px;
      border: 1px solid rgba(30, 58, 88, 0.5);
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(
        135deg, 
        rgba(56, 178, 172, 0.6) 0%, 
        rgba(79, 172, 204, 0.6) 50%, 
        rgba(99, 179, 237, 0.6) 100%
      );
      border-radius: 8px;
      border: 2px solid rgba(15, 23, 42, 0.3);
      transition: all 0.3s ease;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(
        135deg, 
        rgba(56, 178, 172, 0.8) 0%, 
        rgba(79, 172, 204, 0.8) 50%, 
        rgba(99, 179, 237, 0.8) 100%
      );
      border: 2px solid rgba(56, 178, 172, 0.2);
      box-shadow: 
        0 0 10px rgba(56, 178, 172, 0.3),
        inset 0 0 10px rgba(255, 255, 255, 0.1);
    }

    ::-webkit-scrollbar-thumb:active {
      background: linear-gradient(
        135deg, 
        rgba(56, 178, 172, 1) 0%, 
        rgba(79, 172, 204, 1) 50%, 
        rgba(99, 179, 237, 1) 100%
      );
      box-shadow: 
        0 0 15px rgba(56, 178, 172, 0.5),
        inset 0 0 15px rgba(255, 255, 255, 0.2);
    }

    ::-webkit-scrollbar-corner {
      background: rgba(15, 23, 42, 0.8);
    }

    /* Firefox Scrollbar Styles */
    * {
      scrollbar-width: thin;
      scrollbar-color: rgba(56, 178, 172, 0.6) rgba(15, 23, 42, 0.8);
    }

    html {
      scroll-behavior: smooth;
    }
    
    body {
      overflow-x: hidden;
      overflow-y: auto;
    }
    
    section {
      position: relative;
    }

    /* Responsive scrollbar adjustments */
    @media (max-width: 768px) {
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
    }

    @media (max-width: 480px) {
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
    }

    /* Accessibility improvements */
    @media (prefers-reduced-motion: reduce) {
      ::-webkit-scrollbar-thumb {
        animation: none !important;
      }
    }
  `}</style>
);

// ===== OCEANIC ICONS =====
const CloudIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-sky-300">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
);

const ServerIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-teal-300">
    <rect x="2" y="3" width="20" height="4" rx="1"/>
    <rect x="2" y="9" width="20" height="4" rx="1"/>
    <rect x="2" y="15" width="20" height="4" rx="1"/>
    <circle cx="6" cy="5" r="0.5"/>
    <circle cx="6" cy="11" r="0.5"/>
    <circle cx="6" cy="17" r="0.5"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-blue-300">
    <polyline points="16,18 22,12 16,6"/>
    <polyline points="8,6 2,12 8,18"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-cyan-200">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  </svg>
);

// ===== OCEANIC ENHANCED BACKGROUND =====
const OceanicBackground = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobileDevice = isMobile();
  const reduceMotion = shouldReduceMotion();

  useEffect(() => {
    if (isMobileDevice || reduceMotion) return;
    
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobileDevice, reduceMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      {/* Oceanic base gradient */}
      <motion.div 
        className="absolute inset-0"
        animate={!isMobileDevice && !reduceMotion ? {
          background: [
            'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
            'linear-gradient(135deg, #0c1429 0%, #1a2332 25%, #2d3748 50%, #4a5568 75%, #718096 100%)',
            'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
          ]
        } : {}}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={isMobileDevice || reduceMotion ? {
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
        } : {}}
      />
      
      {/* Interactive oceanic overlay - disabled on mobile */}
      {!isMobileDevice && (
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(56, 178, 172, 0.12) 0%, 
              rgba(79, 172, 204, 0.08) 30%, 
              rgba(99, 179, 237, 0.06) 50%, 
              transparent 70%)`
          }}
        />
      )}
      
      {/* Subtle wave patterns - simplified on mobile */}
      {!isMobileDevice && (
        <motion.div
          className="absolute inset-0 opacity-8"
          style={{
            background: `radial-gradient(ellipse at center, 
              transparent 0%, 
              rgba(56, 178, 172, 0.06) 30%, 
              transparent 60%)`
          }}
          animate={!reduceMotion ? {
            transform: ['scale(1) rotate(0deg)', 'scale(1.1) rotate(180deg)', 'scale(1) rotate(360deg)'],
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
      
      {/* Enhanced oceanic grid pattern - disabled on mobile */}
      {!isMobileDevice && (
        <motion.div 
          className="absolute inset-0 opacity-[0.015]"
          animate={!reduceMotion ? {
            backgroundPosition: ['0px 0px', '50px 50px'],
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 178, 172, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 178, 172, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(79, 172, 204, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 172, 204, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px, 100px 100px, 100px 100px',
          }}
        />
      )}
      
      {/* Ambient oceanic orbs - simplified on mobile */}
      {!isMobileDevice && (
        <>
          <motion.div
            className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full opacity-8"
            animate={!reduceMotion ? {
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.15, 0.08],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: 'radial-gradient(circle, rgba(56, 178, 172, 0.2) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          
          <motion.div
            className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full opacity-6"
            animate={!reduceMotion ? {
              scale: [1.2, 1, 1.2],
              opacity: [0.12, 0.06, 0.12],
            } : {}}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            style={{
              background: 'radial-gradient(circle, rgba(79, 172, 204, 0.25) 0%, transparent 70%)',
              filter: 'blur(70px)',
            }}
          />
        </>
      )}
    </div>
  );
};

// ===== OCEANIC ANIMATION VARIANTS =====
const oceanicAnimationVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  },
  floating: {
    animate: {
      y: [-12, 12, -12],
      rotate: [0, 6, -6, 0],
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

// ===== OCEANIC FLOATING TECH ICONS =====
const OceanicFloatingTechIcons = () => {
  const isMobileDevice = isMobile();
  const reduceMotion = shouldReduceMotion();
  
  if (isMobileDevice) return null;
  
  const techIcons = [
    { Icon: CloudIcon, delay: 0, position: { top: '20%', left: '8%' } },
    { Icon: ServerIcon, delay: 1.5, position: { top: '35%', right: '12%' } },
    { Icon: CodeIcon, delay: 3, position: { top: '65%', left: '6%' } },
    { Icon: SparklesIcon, delay: 0.8, position: { top: '75%', right: '10%' } },
  ];

  return (
    <>
      {techIcons.map(({ Icon, delay, position }, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden lg:block z-20 pointer-events-none"
          style={position}
          variants={oceanicAnimationVariants.floating}
          animate={!reduceMotion ? "animate" : {}}
          transition={{ delay }}
        >
          <motion.div 
            className="p-4 rounded-2xl bg-slate-800/20 backdrop-blur-md border border-slate-600/30 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            animate={{
              boxShadow: [
                "0 10px 30px rgba(56, 178, 172, 0.1)",
                "0 15px 35px rgba(79, 172, 204, 0.15)",
                "0 10px 30px rgba(56, 178, 172, 0.1)",
              ],
            }}
          >
            <Icon />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

// ===== OCEANIC HERO TEXT =====
const OceanicHeroText = () => (
  <div className="flex-1 max-w-5xl text-center px-4 sm:px-0">
    <motion.div className="mb-12" variants={oceanicAnimationVariants.item}>
      {/* Oceanic Enhanced Name */}
      <motion.h1 
        className={`${styles.heroHeadText} text-slate-100 leading-tight mb-6`}
        variants={oceanicAnimationVariants.item}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Niharika
        </motion.span>{' '}
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        >
          Dubey
        </motion.span>
      </motion.h1>

      {/* Oceanic Enhanced Subtitle */}
      <motion.div
        className="inline-block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="relative">
          <motion.p 
            className="text-slate-300 text-base md:text-lg font-semibold tracking-wider uppercase bg-gradient-to-r from-cyan-100 to-blue-100 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Infrastructure & DevOps Engineer
          </motion.p>
          <motion.div 
            className="flex items-center justify-center mt-4"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 sm:w-10 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
              <div className="w-12 sm:w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full"></div>
              <div className="w-6 sm:w-10 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>

    {/* Oceanic Enhanced Description */}
    <motion.div 
      className="mb-12 max-w-4xl mx-auto space-y-6" 
      variants={oceanicAnimationVariants.item}
    >
      <motion.p 
        className="text-slate-300 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Passionate Software Engineer specializing in{' '}
        <motion.span 
          className="text-sky-300 font-semibold hover:text-sky-200 transition-colors cursor-default"
          whileHover={{ scale: 1.05 }}
        >
          Cloud Architecture
        </motion.span>,{' '}
        <motion.span 
          className="text-teal-300 font-semibold hover:text-teal-200 transition-colors cursor-default"
          whileHover={{ scale: 1.05 }}
        >
          DevOps Automation
        </motion.span>,{' '}
        <motion.span 
          className="text-cyan-300 font-semibold hover:text-cyan-200 transition-colors cursor-default"
          whileHover={{ scale: 1.05 }}
        >
          Managed File Transfer
        </motion.span>,{' '}
        <motion.span 
          className="text-blue-300 font-semibold hover:text-blue-200 transition-colors cursor-default"
          whileHover={{ scale: 1.05 }}
        >
          API Management
        </motion.span>, and{' '}
        <motion.span 
          className="text-slate-200 font-semibold hover:text-slate-100 transition-colors cursor-default"
          whileHover={{ scale: 1.05 }}
        >
          Artificial Intelligence
        </motion.span>.
      </motion.p>
      
      <motion.p 
        className="text-slate-300 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        Building{' '}
        <span className="text-slate-100 font-semibold">scalable solutions</span>{' '}
        that drive{' '}
        <span className="text-teal-300 font-semibold">business transformation</span>.
      </motion.p>
    </motion.div>

    {/* Oceanic Enhanced Tech Stack Tags */}
    <motion.div 
      className="flex flex-wrap gap-3 justify-center"
      variants={oceanicAnimationVariants.item}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 }}
    >
      {['AWS', 'Kubernetes', 'DevOps', 'Jenkins', 'Docker', 'Terraform'].map((tech, index) => (
        <motion.span
          key={tech}
          className="px-4 py-2 rounded-full bg-slate-800/30 backdrop-blur-sm border border-slate-600/40 text-sm font-medium text-slate-200 hover:bg-slate-700/40 hover:border-sky-400/40 hover:text-sky-300 transition-all duration-300 cursor-default"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            boxShadow: "0 5px 15px rgba(56, 178, 172, 0.2)"
          }}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
        >
          {tech}
        </motion.span>
      ))}
    </motion.div>
  </div>
);

// ===== OCEANIC STATS OVERLAY =====
const OceanicStatsOverlay = () => {
  const stats = [
    { label: 'Experience', value: '6+ Years', icon: '🌊', color: 'sky' },
    { label: 'Projects', value: '50+', icon: '⚓', color: 'teal' },
    { label: 'Technologies', value: '25+', icon: '🐚', color: 'blue' },
  ];

  return (
    <motion.div 
      className="absolute bottom-8 left-8 z-30 hidden xl:flex items-center gap-4"
      initial={{ opacity: 0, y: 50, x: -50 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        transition: { 
          duration: 0.8, 
          delay: 1.5,
          type: "spring",
          stiffness: 100
        } 
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="group relative py-3 px-4 rounded-xl bg-slate-800/20 backdrop-blur-md border border-slate-600/30 text-slate-200 hover:bg-slate-700/30 hover:border-slate-500/40 transition-all duration-300"
          whileHover={{ 
            y: -4,
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + index * 0.1 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{stat.icon}</span>
            <div>
              <div className="text-sm font-bold">{stat.value}</div>
              <div className="text-xs opacity-70">{stat.label}</div>
            </div>
          </div>
          
          {/* Oceanic hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, rgba(${
                stat.color === 'sky' ? '56, 189, 248' : 
                stat.color === 'teal' ? '56, 178, 172' : '99, 179, 237'
              }, 0.1) 0%, transparent 100%)`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// ===== OCEANIC CTA BUTTONS =====
const OceanicCTAButtons = () => {
  const buttons = [
    {
      href: "mailto:niharika859@gmail.com",
      text: "Email Me",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      gradient: "from-sky-500/15 to-blue-500/15",
      borderColor: "border-sky-400/30",
      textColor: "text-sky-300",
      hoverGradient: "hover:from-sky-500/25 hover:to-blue-500/25"
    },
    {
      href: "https://cal.com/nihharikadubey/30min",
      text: "Schedule Call",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      gradient: "from-teal-500/15 to-cyan-500/15",
      borderColor: "border-teal-400/30",
      textColor: "text-teal-300",
      hoverGradient: "hover:from-teal-500/25 hover:to-cyan-500/25",
      external: true
    },
    {
      href: "https://drive.google.com/file/d/112yrR6dOKE0YuVO2Fs4PLxSshV76pC0n/view?usp=sharing",
      text: "Download CV",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      ),
      gradient: "from-blue-500/15 to-slate-500/15",
      borderColor: "border-blue-400/30",
      textColor: "text-blue-300",
      hoverGradient: "hover:from-blue-500/25 hover:to-slate-500/25",
      external: true
    }
  ];

  return (
    <motion.div 
      className="absolute bottom-8 right-8 z-30 hidden xl:flex items-center gap-4"
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        transition: { 
          duration: 0.8, 
          delay: 1.5,
          type: "spring",
          stiffness: 100
        }
      }}
    >
      {buttons.map((button, index) => (
        <motion.a
          key={button.text}
          href={button.href}
          {...(button.external && { target: "_blank", rel: "noopener noreferrer" })}
          className={`group relative py-3 px-6 rounded-full outline-none font-medium text-sm shadow-lg overflow-hidden bg-gradient-to-r ${button.gradient} backdrop-blur-md border ${button.borderColor} ${button.textColor} hover:text-slate-100 ${button.hoverGradient} transition-all duration-300 flex items-center gap-2`}
          whileHover={{ 
            y: -4,
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + index * 0.1 }}
        >
          {button.icon}
          <span>{button.text}</span>
          
          {/* Oceanic shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

// ===== OCEANIC HERO COMPONENT =====
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effects
  const yTransform = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleTransform = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GlobalScrollbarStyles />
      
      {/* Oceanic Enhanced Background */}
      <OceanicBackground />
      
      {/* Main Content */}
      <div className="relative w-full h-full z-10">
        <motion.div 
          className={`${styles.paddingX} absolute inset-0 max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-h-screen`}
          style={{ 
            y: yTransform, 
            opacity: opacityTransform,
            scale: scaleTransform,
            paddingBottom: '8rem',
            paddingTop: '10rem',
            marginTop: '0',
            transform: 'translateY(0)'
          }}
          variants={oceanicAnimationVariants.container} 
          initial="hidden" 
          animate={isVisible ? "visible" : "hidden"}
        >
          <OceanicHeroText />
        </motion.div>
        
        {/* Oceanic Enhanced Bottom Overlays */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-30">
          <OceanicStatsOverlay />
          <OceanicCTAButtons />
        </div>
      </div>

      {/* Oceanic CSS Animations */}
      <style jsx>{`
        @keyframes oceanic-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes oceanic-wave {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default Hero;