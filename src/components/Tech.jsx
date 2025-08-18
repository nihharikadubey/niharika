import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { isMobile, shouldReduceMotion } from '../utils/deviceDetect';

const Tech = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasLoaded, setHasLoaded] = useState(false);

  // Set loaded state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Organize technologies by categories for better presentation
  const techCategories = {
    all: { name: 'All', icon: '🚀', technologies: technologies },
    cloud: { 
      name: 'Cloud & Infrastructure', 
      icon: '☁️', 
      technologies: technologies.filter(tech => 
        ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform'].includes(tech.name)
      )
    },
    devops: { 
      name: 'DevOps & Automation', 
      icon: '⚙️', 
      technologies: technologies.filter(tech => 
        ['Jenkins', 'Ansible', 'git', 'Prometheus', 'Grafana'].includes(tech.name)
      )
    },
    programming: { 
      name: 'Programming & Scripting', 
      icon: '💻', 
      technologies: technologies.filter(tech => 
        ['Java', 'Shell', 'Bash', 'SQL'].includes(tech.name)
      )
    },
    tools: { 
      name: 'Tools & Platforms', 
      icon: '🛠️', 
      technologies: technologies.filter(tech => 
        ['MongoDB', 'Linux', 'SFTP', 'Connect', 'MQ', 'Kafka'].includes(tech.name)
      )
    }
  };

  const displayedTechnologies = techCategories[activeCategory]?.technologies || technologies;

  // Optimized animation variants for faster load
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // Reduced stagger
        delayChildren: 0, // No delay
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      }
    },
    // Static state for when already loaded
    static: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0 }
    }
  };

  // Category change animation variants
  const categoryChangeVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Get gradient colors for different tech types
  const getGradientColors = (index, techName) => {
    const gradients = [
      'from-blue-500 via-purple-500 to-pink-500',
      'from-green-400 via-cyan-500 to-blue-500',
      'from-yellow-400 via-red-500 to-pink-500',
      'from-purple-400 via-pink-500 to-red-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-cyan-400 via-blue-500 to-purple-500',
      'from-green-400 via-emerald-500 to-teal-500',
      'from-orange-400 via-red-500 to-pink-500'
    ];
    
    // Special colors for specific technologies
    if (techName.toLowerCase().includes('aws')) return 'from-orange-400 to-orange-600';
    if (techName.toLowerCase().includes('azure')) return 'from-blue-400 to-blue-600';
    if (techName.toLowerCase().includes('docker')) return 'from-blue-400 to-cyan-500';
    if (techName.toLowerCase().includes('kubernetes')) return 'from-blue-500 to-indigo-600';
    if (techName.toLowerCase().includes('jenkins')) return 'from-blue-600 to-blue-800';
    
    return gradients[index % gradients.length];
  };

  return (
    <section id="tech" className="relative w-full py-12 sm:py-4 bg-transparent overflow-hidden">
      {/* DARK COSMIC UNIVERSE BACKGROUND - Enhanced Celestial Activity */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* DEEP SPACE GRADIENT */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, #0a0e2a 0%, #000000 70%)',
          }}
        />

        {/* Static Blue Cloud */}
        <div
          className="absolute rounded-full opacity-10 blur-3xl"
          style={{
            width: '60vw',
            height: '60vh',
            background: 'radial-gradient(circle, #0ea5e9, transparent 70%)',
            left: '20%',
            top: '20%',
          }}
        />

        {/* Dense Starfield Background */}
        <div className="absolute inset-0">
          {[...Array(isMobile() ? 50 : 100)].map((_, i) => (
            <div
              key={`star-bg-${i}`}
              className="absolute rounded-full bg-white/50"
              style={{
                width: '1px',
                height: '1px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
          
          {/* Green Particle Stars */}
          {[...Array(isMobile() ? 15 : 40)].map((_, i) => (
            <motion.div
              key={`green-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                background: 'radial-gradient(circle, #10b981, #22c55e)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: '0 0 4px #10b981',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 3,
              }}
            />
          ))}
          
          {/* Static Green Glow */}
          {!isMobile() && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div 
                className="absolute rounded-full opacity-10 blur-3xl"
                style={{
                  width: '40vw',
                  height: '40vh',
                  background: 'radial-gradient(circle, #10b981, transparent 70%)',
                  left: '30%',
                  top: '30%',
                }}
              />
            </div>
          )}
        </div>
        
        {/* Starfield Layer 1 - Dense Bright Stars */}
        <div className="absolute inset-0">
          {[...Array(isMobile() ? 30 : shouldReduceMotion() ? 150 : 250)].map((_, i) => {
            const size = 0.5 + Math.random() * 1.5;
            const starColor = [
              'rgba(255, 255, 255, 1)',
              'rgba(219, 234, 254, 1)',
              'rgba(147, 197, 253, 0.9)',
              'rgba(196, 181, 253, 0.8)',
              'rgba(16, 185, 129, 0.9)', // Green stars
              'rgba(34, 197, 94, 0.8)' // Lighter green stars
            ][Math.floor(Math.random() * 4)];
            
            return (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: starColor,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${1 + Math.random() * 2}px currentColor`,
                  opacity: 0.8,
                }}
                animate={!shouldReduceMotion() ? {
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: Math.random() * 5,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 mt-0">
        {/* Enhanced Header */}
        <motion.div 
          variants={textVariant()} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          
          
          {/* Icon above Technical Skills */}
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-40 sm:animate-pulse"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border-2 border-cyan-400/30 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
                <div className="hidden sm:block absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 animate-ping"></div>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="w-10 h-10 text-cyan-300 relative z-10"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            className={`${styles.sectionHeadText} bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Technical Skills
          </motion.h2>

          {/* Oceanic Gradient Divider */}
          <motion.div 
            className="flex items-center justify-center mb-6 sm:mb-8"
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

          <motion.p 
            className="text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            A comprehensive toolkit of technologies I've mastered through hands-on experience 
            in enterprise environments, covering cloud infrastructure, DevOps automation, 
            and modern development practices.
          </motion.p>
        </motion.div>



 {/* Category Tabs */}
 <motion.div 
          className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {Object.entries(techCategories).map(([key, category], index) => (
            <button
              key={key} onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === key 
                  ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg'
                  : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/[0.08]'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.name}
                <span className="text-xs opacity-60">({category.technologies.length})</span>
              </span>
            </button>
          ))}
        </motion.div>
 
        {/* Skills Grid without block/tab backgrounds */}
        <motion.div
          key={activeCategory}
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 justify-items-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={hasLoaded ? "visible" : "hidden"}
        >
          {displayedTechnologies.map((technology, index) => (
            <motion.div
              key={`${activeCategory}-${technology.name}`}
              variants={hasLoaded ? itemVariants : categoryChangeVariants}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center cursor-pointer transition-transform duration-200 group"
            >
              <motion.img
                src={technology.icon}
                alt={technology.name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain mb-2 drop-shadow-md transition-all duration-200 group-hover:brightness-125"
                loading="eager"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
              <h3 className="text-xs sm:text-sm text-center transition-colors duration-300 text-white/80 group-hover:text-white group-hover:font-semibold">
                {technology.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");
