import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// Remove the styles import since it's not used and causing issues
// import { styles } from '../styles';

// Updated experiences data with all companies
const experiences = [
  {
    title: "Senior DevOps Engineer",
    company_name: "HSBC Bank",
    date: "Apr 2025 — Present",
    icon: "/hsbc.png",
    current: true,
    points: [
      "Implemented CI/CD pipelines for BigID using Jenkins and GitHub on GCP",
      "Implemented helm charts, used Docker and Kubernetes for containerization",
      "Worked on MongoDB database, implemented backup and recovery strategy",
      "Implemented logging using ELK stack, worked on cost optimization",
    ]
  },
  {
    title: "Infrastructure Engineer",
    company_name: "OCBC Bank",
    date: "Jan 2023 — Mar 2025",
    icon: "/ocbc.png",
    points: [
      "Worked on MFT and API data transfer flows using IBM Sterling and Tibco",
      "Designed and implemented automated CI/CD pipelines for 50+ applications",
      "Architected scalable microservices infrastructure serving 1M+ users",
      "Led cloud migration initiatives reducing infrastructure costs by 40%",
    ]
  },
  {
    title: "Cloud Infrastructure Specialist",
    company_name: "Siemens Healthineers",
    date: "Oct 2022 — Dec 2022",
    icon: "/seh.png",
    points: [
      "Developed and deployed data flows on integration platform GoAnywhereMFT",
      "Implemented TCP/IP, AS2 protocols for secure file transfer"
    ]
  },
  {
    title: "Senior System Engineer",
    company_name: "Infosys Limited",
    date: "2019 — 2022",
    icon: "/infy.png",
    points: [
      "Worked on MFT and API data transfer flows using IBM Sterling and Tibco",
      "Automated deployment processes reducing release time by 60%",
      "Managed Kubernetes clusters across multiple environments",
      "Implemented monitoring solutions improving system reliability"
    ]
  }
];

// Elegant floating elements for grid cards
const ElegantFloatingElement = ({ delay = 0, position = 'top-left' }) => {
  const positions = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  return (
    <motion.div
      className={`absolute ${positions[position]} w-1 h-1 bg-gradient-to-br from-slate-400/30 to-slate-300/40 rounded-full`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0],
        scale: [0, 1, 1.2, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2,
        ease: "easeInOut"
      }}
    />
  );
};

// Grid Experience Card Component
const GridExperienceCard = React.memo(({ exp, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Company-specific styling
  const companyStyles = React.useMemo(() => {
    const styleMap = {
      'HSBC': {
        gradient: 'from-red-500/20 via-red-400/10 to-red-300/5',
        border: 'border-red-400/30 hover:border-red-400/50',
        accent: 'text-red-400',
        shadow: 'shadow-red-500/10',
        glow: 'group-hover:shadow-red-500/20'
      },
      'OCBC': {
        gradient: 'from-orange-500/20 via-orange-400/10 to-orange-300/5',
        border: 'border-orange-400/30 hover:border-orange-400/50',
        accent: 'text-orange-400',
        shadow: 'shadow-orange-500/10',
        glow: 'group-hover:shadow-orange-500/20'
      },
      'Siemens': {
        gradient: 'from-blue-500/20 via-blue-400/10 to-blue-300/5',
        border: 'border-blue-400/30 hover:border-blue-400/50',
        accent: 'text-blue-400',
        shadow: 'shadow-blue-500/10',
        glow: 'group-hover:shadow-blue-500/20'
      },
      'Infosys': {
        gradient: 'from-purple-500/20 via-purple-400/10 to-purple-300/5',
        border: 'border-purple-400/30 hover:border-purple-400/50',
        accent: 'text-purple-400',
        shadow: 'shadow-purple-500/10',
        glow: 'group-hover:shadow-purple-500/20'
      },
      'default': {
        gradient: 'from-slate-500/20 via-slate-400/10 to-slate-300/5',
        border: 'border-slate-400/30 hover:border-slate-400/50',
        accent: 'text-slate-400',
        shadow: 'shadow-slate-500/10',
        glow: 'group-hover:shadow-slate-500/20'
      }
    };

    return Object.entries(styleMap).find(([key]) => 
      exp.company_name.includes(key)
    )?.[1] || styleMap.default;
  }, [exp.company_name]);

  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '50px 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{
        type: "tween",
        duration: 0.3,
        delay: index * 0.02
      }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      {/* Current role indicator */}
      {exp.current && (
        <motion.div
          className="absolute -top-2 -right-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Current
          </div>
        </motion.div>
      )}

      {/* Floating elements */}
      {isInView && (
        <>
          <ElegantFloatingElement delay={0} position="top-left" />
          <ElegantFloatingElement delay={1} position="top-right" />
          <ElegantFloatingElement delay={2} position="bottom-left" />
          <ElegantFloatingElement delay={0.5} position="bottom-right" />
        </>
      )}

      {/* Main card */}
      <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 shadow-lg transition-all duration-500 overflow-hidden">
        {/* Content */}
        <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Company logo */}
            <div 
              className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 bg-white rounded-lg sm:rounded-xl flex-shrink-0 flex items-center justify-center border-2 border-white/20 shadow-lg p-1 transition-all duration-300 hover:scale-105"
            >
              <div className="w-full h-full bg-white rounded-md sm:rounded-lg flex items-center justify-center overflow-hidden">
                {!imageError ? (
                  <img 
                    src={exp.icon} 
                    alt={exp.company_name}
                    className="w-full h-full object-contain scale-125 transition-transform duration-300 group-hover:scale-150"
                    onError={() => setImageError(true)}
                    loading="lazy"
                    width={80}
                    height={80}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 rounded-md sm:rounded-lg flex items-center justify-center text-white font-bold text-xl sm:text-2xl">
                    {exp.company_name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            
            {/* Company info */}
            <div className="flex-1 min-w-0">
              <motion.h3 
                className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight"
                layoutId={`title-${index}`}
              >
                {exp.title}
              </motion.h3>
              
              <motion.h4 
                className="text-sm sm:text-base font-semibold text-slate-300 mb-2 leading-tight"
                layoutId={`company-${index}`}
              >
                {exp.company_name}
              </motion.h4>
              
              <motion.p 
                className="text-slate-400 text-xs sm:text-sm bg-slate-800/50 px-2 sm:px-3 py-1 rounded-full inline-block border border-slate-600/50"
                layoutId={`date-${index}`}
              >
                {exp.date}
              </motion.p>
            </div>
          </div>
          
          {/* Experience points */}
          <div className="flex-1">
            <motion.ul className="space-y-2 sm:space-y-3">
              {exp.points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 sm:gap-3 text-slate-300 leading-relaxed text-xs sm:text-sm group/item cursor-default"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.1 + (index * 0.02) + (i * 0.02) }}
                >
                  <motion.span 
                    className="text-slate-400 text-sm sm:text-base mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200"
                  >
                    •
                  </motion.span>
                  <span className="group-hover/item:text-white transition-colors duration-200">
                    {point}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="mt-4 sm:mt-6 h-0.5 sm:h-1 bg-gradient-to-r from-slate-400/20 to-slate-300/10 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
          />
        </div>

        {/* Hover glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-2xl ${companyStyles.shadow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          style={{
            background: `linear-gradient(135deg, ${companyStyles.gradient.replace(/from-|via-|to-/g, '').split(' ').map(color => color + '/10').join(', ')})`,
          }}
        />
      </div>
    </motion.div>
  );
});

const Experience = () => {
  const containerRef = useRef(null);

  return (
    <section id="work" ref={containerRef} className="relative py-16 px-4 min-h-screen z-10">
      {/* Enhanced background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden z-0"
        initial="hidden"
        animate="visible"
      >
        {/* Ambient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-600/8 to-slate-500/4 rounded-full blur-3xl"
        />
        
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-slate-500/6 to-slate-400/3 rounded-full blur-3xl"
        />

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 pt-0 z-10">
        {/* Elegant Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon above title */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-600/30 backdrop-blur-sm border border-slate-500/30 flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="w-8 h-8 text-slate-300"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-white to-slate-200 mb-4">
            Professional Journey
          </h2>
          
          {/* Oceanic Gradient Divider */}
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 sm:w-10 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
              <div className="w-12 sm:w-24 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full"></div>
              <div className="w-6 sm:w-10 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
            </div>
          </motion.div>
          
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto">
            A timeline of growth, innovation, and impact across leading technology organizations
          </p>
        </motion.div>

        {/* Elegant Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {experiences.map((exp, index) => (
            <GridExperienceCard 
              key={`${exp.company_name}-${index}`}
              exp={exp} 
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Remove the SectionWrapper since it's causing import issues
export default Experience;