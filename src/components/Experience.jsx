import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';

// Add the missing textVariant function
const textVariant = (delay = 0) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
      },
    },
  };
};

// Updated experiences data with all companies
const experiences = [
  {
    title: "Senior DevOps Engineer",
    company_name: "HSBC Bank",
    date: "Apr 2025 — Present",
    icon: "/hsbc.png",
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
    date: "2020 — 2022",
    icon: "/infy.png",
    points: [
      "Worked on MFT and API data transfer flows using IBM Sterling and Tibco",
      "Automated deployment processes reducing release time by 60%",
      "Managed Kubernetes clusters across multiple environments",
      "Implemented monitoring solutions improving system reliability"
    ]
  }
];

// Subtle floating elements
const FloatingElement = ({ delay = 0, size = 'small' }) => {
  const sizeClasses = {
    small: 'w-1 h-1',
    medium: 'w-2 h-2',
    large: 'w-3 h-3'
  };

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-gradient-to-br from-slate-400/20 to-slate-300/30 rounded-full backdrop-blur-sm`}
      initial={false}
      animate={{
        opacity: [0, 0.4, 0.2, 0],
        y: [-20, -60],
        x: [0, Math.random() * 30 - 15],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 4,
        ease: "easeOut"
      }}
    />
  );
};

// Subtle flowing effect
const SubtleFlow = ({ direction = 'left' }) => (
  <motion.div
    className="absolute inset-0 overflow-hidden pointer-events-none"
    initial={false}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="h-px bg-gradient-to-r from-transparent via-slate-300/20 to-transparent"
      animate={{
        x: direction === 'left' ? ['-100%', '200%'] : ['200%', '-100%'],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </motion.div>
);

// Memoize the component to prevent unnecessary re-renders
const ExperienceCard = React.memo(({ exp, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Memoize these functions to prevent recreation on each render
  const companyStyles = React.useMemo(() => {
    const accentMap = {
      'HSBC': 'border-red-400/30 hover:border-red-400/50',
      'OCBC': 'border-orange-400/30 hover:border-orange-400/50',
      'Siemens': 'border-blue-400/30 hover:border-blue-400/50',
      'Infosys': 'border-purple-400/30 hover:border-purple-400/50',
      'default': 'border-slate-400/30 hover:border-slate-400/50'
    };

    const filterMap = {
      'HSBC': 'brightness-110 contrast-110 saturate-120',
      'OCBC': 'brightness-110 contrast-110 saturate-150',
      'Siemens': 'brightness-105 contrast-115 saturate-130',
      'Infosys': 'brightness-120 contrast-120 saturate-150',
      'default': 'contrast-120 brightness-110 saturate-120'
    };

    return {
      accent: Object.entries(accentMap).find(([key]) => 
        exp.company_name.includes(key)
      )?.[1] || accentMap.default,
      filter: Object.entries(filterMap).find(([key]) => 
        exp.company_name.includes(key)
      )?.[1] || filterMap.default
    };
  }, [exp.company_name]);

  // Use intersection observer to detect when card is in view
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '100px 0px' }
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

  // Determine if the card should be on the left or right of the timeline
  const isEven = index % 2 === 0;
  
  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full flex ${isEven ? 'justify-start' : 'justify-end'} ${index === 0 ? 'mt-0' : 'mt-12'}`}
    >
      {/* Timeline line connector */}
      {index !== experiences.length - 1 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-slate-500/30 to-transparent">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-slate-500/30" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent to-slate-500/30" />
        </div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white/80 shadow-lg z-10" />
      
      <div className={`w-full max-w-[calc(50%-2rem)] ${isEven ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
        <div className={`group relative transition-all duration-300 ${isHovered ? '-translate-y-1' : ''}`}>
          {/* Only render floating elements when in view */}
          {isInView && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <FloatingElement 
                delay={0} 
                size="small"
              />
            </div>
          )}

          {/* Optimized card with reduced animations */}
          <div className={`relative bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 overflow-hidden ${
            isHovered ? 'bg-white/8 shadow-xl' : ''
          }`}>
            {/* Only render subtle flow when in view */}
            {isInView && <SubtleFlow direction={index % 2 === 0 ? 'left' : 'right'} />}
            
            <div className="relative z-10">
              {/* Header with Company Logo and Info */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                <div 
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex-shrink-0 flex items-center justify-center border ${
                    companyStyles.accent
                  } shadow-md p-2 transition-all duration-300 ${
                    isHovered ? 'shadow-lg' : ''
                  }`}
                >
                  <div className="w-full h-full bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    {!imageError ? (
                      <img 
                        src={exp.icon} 
                        alt={exp.company_name}
                        className={`w-4/5 h-4/5 object-contain transition-transform duration-300 ${
                          isHovered ? 'scale-105' : ''
                        } ${companyStyles.filter}`}
                        onError={() => setImageError(true)}
                        loading="lazy"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-4/5 h-4/5 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        {exp.company_name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                    {exp.title}
                  </h3>
                  
                  <h4 className="text-base sm:text-lg font-semibold text-slate-300 mb-2 sm:mb-3">
                    {exp.company_name}
                  </h4>
                  
                  <p className="text-slate-400 text-xs sm:text-sm bg-slate-800/50 px-3 py-1 rounded-full inline-block border border-slate-600/50">
                    {exp.date}
                  </p>
                </div>
              </div>
              
              {/* Optimized experience points */}
              <ul className="space-y-3">
                {exp.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-300 leading-relaxed transition-all duration-200 cursor-pointer hover:text-slate-200"
                  >
                    <span className="text-slate-500 text-lg mt-1 flex-shrink-0">
                      •
                    </span>
                    <span className="text-sm sm:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const Experience = () => {
  const containerRef = useRef(null);

  return (
    <section id="work" ref={containerRef} className="relative min-h-screen py-24 px-4 overflow-hidden">
      {/* Enhanced background with smooth animations */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-600/8 rounded-full blur-3xl"
          variants={{
            hidden: { opacity: 0, x: -100, y: -100 },
            visible: { 
              opacity: 0.2, 
              x: 0, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 30,
                damping: 10,
                delay: 0.2
              }
            }
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-500/6 rounded-full blur-3xl"
          variants={{
            hidden: { opacity: 0, x: 100, y: 100 },
            visible: { 
              opacity: 0.2, 
              x: 0, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 30,
                damping: 10,
                delay: 0.4
              }
            }
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 mt-12">
        {/* Professional Header */}
        <motion.div 
          variants={textVariant()} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Icon above Featured Projects */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-block p-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full mb-6 border border-white/20 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl text-slate-200">💼</span>
            </div>
          </motion.div>

          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                stiffness: 100, 
                damping: 10,
                delay: 0.1
              }
            }}
          >
          <motion.h2 
            className={`${styles.sectionHeadText} bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Professional Journey
          </motion.h2>

            {/* Animated Line */}
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div 
                        className="relative w-40 h-1"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
              </motion.div>
            </motion.div>
            
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-4">
              My career path and professional growth over the years
            </p>
          </motion.div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative mt-16">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-slate-500/30 to-transparent">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-slate-500/30" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent to-slate-500/30" />
          </div>
          
          {/* Experience Cards */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company_name}-${index}`}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -30 : 30,
                    scale: 0.98
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                      mass: 0.7,
                      delay: 0.2 + (index * 0.05),
                      opacity: {
                        duration: 0.6,
                        ease: [0.16, 0.77, 0.47, 0.97]
                      },
                      x: {
                        type: "spring",
                        stiffness: 120,
                        damping: 15,
                        mass: 0.7
                      }
                    }
                  }}
                  whileHover={{
                    y: -4,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px", amount: 0.2 }}
                >
                  <ExperienceCard 
                    exp={exp} 
                    index={index} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Simple bottom decoration */}
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mt-16"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;