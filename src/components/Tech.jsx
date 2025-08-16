import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant, fadeIn } from '../utils/motion';
import { isMobile, shouldReduceMotion } from '../utils/deviceDetect';

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
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
    <section id="tech" className="relative w-full py-2 sm:py-4 bg-transparent overflow-hidden">
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
          {[...Array(isMobile() ? 100 : 200)].map((_, i) => (
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
          {[...Array(isMobile() ? 30 : 80)].map((_, i) => (
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
              animate={!isMobile() ? {
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              } : {}}
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
          {[...Array(isMobile() ? 150 : shouldReduceMotion() ? 300 : 500)].map((_, i) => {
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
                animate={!isMobile() && !shouldReduceMotion() ? {
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-block p-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full mb-6 border border-white/20 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-3xl shadow-lg">
              ⚡
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={hasLoaded ? "visible" : "hidden"}
        >
          {displayedTechnologies.map((technology, index) => (
            <motion.div
              key={`${activeCategory}-${technology.name}`}
              variants={hasLoaded ? itemVariants : categoryChangeVariants}
              whileHover={{ y: -2 }}
              onHoverStart={() => setHoveredTech(technology.name)}
              onHoverEnd={() => setHoveredTech(null)}
              className="flex flex-col items-center cursor-pointer transition-transform duration-200"
            >
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-16 h-16 object-contain mb-2 drop-shadow-md transition-all duration-200"
                loading="eager"
                style={{
                  filter: hoveredTech === technology.name ? 'brightness(1.2)' : 'brightness(1)'
                }}
              />
              <h3 className={`text-sm text-center transition-colors duration-300 ${
                hoveredTech === technology.name ? 'text-white font-semibold' : 'text-white/80'
              }`}>
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
