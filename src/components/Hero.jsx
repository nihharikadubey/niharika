import { motion, useScroll, useTransform } from 'framer-motion';
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


// ===== OCEANIC ENHANCED BACKGROUND =====
const OceanicBackground = () => {



};

// ===== OCEANIC ANIMATION VARIANTS =====
const oceanicAnimationVariants = {


};

// ===== OCEANIC FLOATING TECH ICONS =====
const OceanicFloatingTechIcons = () => {
 
};

// ===== OCEANIC HERO TEXT =====
const OceanicHeroText = ({ dividerY }) => (
  <div className="flex-1 max-w-5xl text-center px-4 sm:px-0">
    <div className="mb-12">
      {/* Oceanic Enhanced Name */}
      <motion.h1 
        className={`${styles.heroHeadText} text-slate-100 leading-tight mb-6`}
        variants={oceanicAnimationVariants.item}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
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
            style={{ y: dividerY }}
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
    </div>

    {/* Oceanic Enhanced Description */}
    <div 
      className="mb-12 max-w-4xl mx-auto space-y-6"
    >
      <motion.p 
        className="text-slate-300 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        Building{' '}
        <span className="text-slate-100 font-semibold">scalable solutions</span>{' '}
        that drive{' '}
        <span className="text-teal-300 font-semibold">business transformation</span>.
      </motion.p>
    </div>

    {/* Oceanic Enhanced Tech Stack Tags */}
    <div 
      className="flex flex-wrap gap-3 justify-center"
    >
      {['AWS', 'Kubernetes', 'DevOps', 'Jenkins', 'Docker', 'Terraform'].map((tech, index) => (
        <span
          key={tech}
          className="px-4 py-2 rounded-full bg-slate-800/30 backdrop-blur-sm border border-slate-600/40 text-sm font-medium text-slate-200 hover:bg-slate-700/40 hover:border-sky-400/40 hover:text-sky-300 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
        >
          {tech}
        </span>
      ))}
    </div>
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
    <>
      {/* Desktop version - left side */}
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
          <div
            key={stat.label}
            className="group relative py-3 px-4 rounded-xl bg-slate-800/20 backdrop-blur-md border border-slate-600/30 text-slate-200 hover:bg-slate-700/30 hover:border-slate-500/40"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{stat.icon}</span>
              <div>
                <div className="text-sm font-bold">{stat.value}</div>
                <div className="text-xs opacity-70">{stat.label}</div>
              </div>
            </div>
            
            {/* Oceanic hover glow effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
              style={{
                background: `linear-gradient(135deg, rgba(${
                  stat.color === 'sky' ? '56, 189, 248' : 
                  stat.color === 'teal' ? '56, 178, 172' : '99, 179, 237'
                }, 0.1) 0%, transparent 100%)`,
              }}
            />
          </div>
        ))}
      </motion.div>
      
      {/* Mobile version - below hero content */}
      <motion.div 
        className="xl:hidden flex justify-center items-center gap-2 px-4 pb-6 pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6, 
            delay: 0.3
          } 
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex-1 max-w-[110px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                delay: 0.4 + index * 0.1,
                duration: 0.3
              }
            }}
          >
            <div className="relative py-3 px-2 rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border border-slate-600/30 text-slate-200">
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg mb-1">{stat.icon}</span>
                <div className="text-base font-bold text-cyan-300">{stat.value}</div>
                <div className="text-[11px] opacity-80 text-slate-300">{stat.label}</div>
              </div>
              
              {/* Mobile glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-20"
                style={{
                  background: `linear-gradient(135deg, rgba(${
                    stat.color === 'sky' ? '56, 189, 248' : 
                    stat.color === 'teal' ? '56, 178, 172' : '99, 179, 237'
                  }, 0.15) 0%, transparent 100%)`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
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
    <>
      {/* Desktop version */}
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
        {buttons.map((button) => (
          <a
            key={button.text}
            href={button.href}
            {...(button.external && { target: "_blank", rel: "noopener noreferrer" })}
            className={`group relative py-3 px-6 rounded-full outline-none font-medium text-sm shadow-lg overflow-hidden bg-gradient-to-r ${button.gradient} backdrop-blur-md border ${button.borderColor} ${button.textColor} hover:text-slate-100 ${button.hoverGradient} flex items-center gap-2`}
          >
            {button.icon}
            <span>{button.text}</span>
            
            {/* Oceanic shimmer effect - static */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
            />
          </a>
        ))}
      </motion.div>
      
      {/* Mobile version - Hidden as they're in the nav menu on mobile */}
      {/* We don't show CTA buttons on mobile to keep the interface clean */}
    </>
  );
};

// ===== OCEANIC HERO COMPONENT =====
const Hero = () => {
  const [isVisible, setIsVisible] = useState(true); // Start visible immediately
  const { scrollY } = useScroll();
  
  // Simplified parallax - removed spring for better performance
  const yTransform = useTransform(scrollY, [0, 500], [0, -50]); // Reduced parallax effect
  const opacityTransform = useTransform(scrollY, [0, 400], [1, 0.3]); // Slower fade
  const scaleTransform = 1; // Removed scale transform for performance
  
  // Scroll-based animation for divider
  const dividerY = useTransform(scrollY, [0, 300], [0, -30]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div id="hero" className="relative w-full min-h-screen overflow-hidden pb-4 xl:pb-0 z-10">
      <GlobalScrollbarStyles />
      
      {/* Oceanic Enhanced Background */}
      <OceanicBackground />
      
      {/* Main Content */}
      <div className="relative w-full h-full z-10">
        <div className="min-h-screen flex flex-col">
          <motion.div 
            className={`${styles.paddingX} flex-1 max-w-7xl mx-auto flex flex-col items-center justify-center text-center w-full`}
            style={{ 
              y: yTransform, 
              opacity: opacityTransform,
              paddingBottom: window.innerWidth < 640 ? '1rem' : '8rem',
              paddingTop: window.innerWidth < 640 ? '6rem' : '10rem',
              marginTop: '0'
            }}
            variants={oceanicAnimationVariants.container} 
            initial="visible" 
            animate="visible"
          >
            <OceanicHeroText dividerY={dividerY} />
          </motion.div>
          
          {/* Mobile Stats - Below Hero Content */}
          <div className="xl:hidden">
            <OceanicStatsOverlay />
          </div>
        </div>
        
        {/* Desktop Stats & CTA Buttons - Bottom Overlays */}
        <div className="hidden xl:block absolute bottom-0 left-0 right-0 h-32 z-30">
          <OceanicStatsOverlay />
          <OceanicCTAButtons />
        </div>
        
        {/* Mobile CTA Buttons - Keep at bottom on mobile */}
        <div className="xl:hidden absolute bottom-0 left-0 right-0 z-30">
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