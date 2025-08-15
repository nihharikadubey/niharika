import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ 
  name, 
  description, 
  image, 
  tags, 
  source_code_link, 
  live_demo_link,
  highlights,
  category,
  status,
  index 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get gradient colors based on index - using blue/teal theme
  const getCardGradient = (idx) => {
    const gradients = [
      'from-cyan-500/20 via-blue-500/20 to-slate-900/20',
      'from-blue-500/20 via-indigo-500/20 to-slate-900/20',
      'from-teal-500/20 via-cyan-500/20 to-slate-900/20',
      'from-sky-500/20 via-blue-500/20 to-slate-900/20',
      'from-cyan-400/20 via-teal-500/20 to-slate-900/20',
      'from-blue-400/20 via-indigo-500/20 to-slate-900/20'
    ];
    return gradients[idx % gradients.length];
  };

  const getBorderGradient = (idx) => {
    const borders = [
      'from-cyan-400 to-blue-500',
      'from-blue-400 to-indigo-500',
      'from-teal-400 to-cyan-500',
      'from-sky-400 to-blue-500',
      'from-cyan-300 to-teal-500',
      'from-blue-300 to-indigo-500'
    ];
    return borders[idx % borders.length];
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="group relative overflow-hidden rounded-2xl p-1 max-w-sm mx-auto w-full"
      style={{
        background: `linear-gradient(135deg, ${getBorderGradient(index).replace('from-', '').replace(' to-', ', ')})`,
      }}
    >
      {/* Card Content */}
      <div className={`relative h-full rounded-2xl p-6 bg-gradient-to-br ${getCardGradient(index)} backdrop-blur-sm border border-white/10 overflow-hidden`}>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
              backgroundSize: '200% 200%',
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Status and Category Badges */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {status && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'Completed' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}>
                {status}
              </span>
            )}
            {category && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {category}
              </span>
            )}
          </div>
          
          {/* Project Number */}
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-xs font-bold text-white/80">{(index + 1).toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Project Image */}
        <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-700/50 animate-pulse rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          
          {imageError ? (
            <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 text-gray-300">
              <div className="text-3xl mb-2">🚀</div>
              <span className="text-xs">Project Preview</span>
            </div>
          ) : (
            <img
              src={image}
              alt={name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
            {source_code_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(source_code_link, "_blank")}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-colors"
                title="View Source Code"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.button>
            )}
            
            {live_demo_link && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(live_demo_link, "_blank")}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-green-500/50 transition-colors"
                title="Live Demo"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.button>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 transition-all duration-300">
            {name}
          </h3>
          
          <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {highlights.slice(0, 2).map((highlight, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full"
                  >
                    ✓ {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technology Tags */}
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, tagIdx) => (
                <motion.span
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + tagIdx * 0.05 }}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  #{tag.name}
                </motion.span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.div>
  );
};

const ProjectsShowcase = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  const showMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
  };

  return (
    <section id="projects" className="relative w-full py-2 bg-transparent overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #ec4899 0%, transparent 50%)`,
          backgroundSize: '100px 100px',
          backgroundPosition: '0 0, 50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mt-12">
        {/* Enhanced Header with Icon */}
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
              <span className="text-3xl text-slate-200">🚀</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className={`${styles.sectionHeadText} bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Projects
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore my collection of DevOps, cloud infrastructure, and automation projects. 
            Each represents real-world solutions built with modern technologies and best practices.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {projects.slice(0, visibleProjects).map((project, idx) => (
            <ProjectCard key={project.name} {...project} index={idx} />
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleProjects < projects.length && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showMore}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">View More Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsShowcase;