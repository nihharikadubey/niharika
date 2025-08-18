import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const CurrentlyLearning = () => {
  const learningItems = [
    {
      title: 'Architecting Solutions on AWS',
      description: 'Advanced cloud architecture patterns and best practices',
      progress: 75,
      resources: ['AWS Well-Architected', 'Solution Architecture'],
    },
    {
      title: 'Google Cloud SRE & DevOps',
      description: 'Site Reliability Engineering and DevOps practices',
      progress: 60,
      resources: ['SRE Principles', 'GCP DevOps Tools'],
    },
    {
      title: 'DevOps with AI on AWS',
      description: 'Integrating AI/ML into DevOps workflows',
      progress: 45,
      resources: ['AI-Powered DevOps', 'AWS AI Services'],
    },
    {
      title: 'MLOps Engineering',
      description: 'Machine Learning Operations and pipeline automation',
      progress: 40,
      resources: ['ML Pipeline Design', 'Model Deployment'],
    },
  ];

  return (
    <section className="relative w-full py-8 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2 sm:mb-12"
        >
          {/* Icon above title */}
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
                  <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-white to-slate-200 mb-4">
            Currently Learning
          </h2>
          
          {/* Oceanic Gradient Divider */}
          <motion.div 
            className="flex items-center justify-center mb-2 sm:mb-6"
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
          
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Staying ahead with the latest technologies and best practices in DevOps and Cloud Engineering
          </p>
        </motion.div>

        {/* Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningItems.map((item, index) => (
            <div
              key={item.title}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 group"
            >
              <div className="flex items-start gap-4">
                {/* Subtle accent bar */}
                <div className="w-1 h-full bg-gradient-to-b from-cyan-400/30 to-blue-500/30 rounded-full" />

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-white/50 mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="flex flex-wrap gap-2">
                    {item.resources.map((resource) => (
                      <span
                        key={resource}
                        className="text-xs px-2 py-1 bg-slate-700/30 text-white/70 rounded-md"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 sm:mt-12 text-center"
        >
          <motion.a
            href="https://github.com/nihharikadubey"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border-2 border-cyan-500/40 rounded-xl hover:from-cyan-600/30 hover:to-blue-600/30 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:to-blue-200 transition-all duration-300">
              Follow My Learning Journey
            </span>
            <svg className="w-5 h-5 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(CurrentlyLearning, 'currently-learning');