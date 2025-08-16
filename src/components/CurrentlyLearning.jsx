import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const CurrentlyLearning = () => {
  const learningItems = [
    {
      title: 'Architecting Solutions on AWS',
      description: 'Advanced cloud architecture patterns and best practices',
      progress: 75,
      icon: '☁️',
      resources: ['AWS Well-Architected', 'Solution Architecture'],
    },
    {
      title: 'Google Cloud SRE & DevOps',
      description: 'Site Reliability Engineering and DevOps practices',
      progress: 60,
      icon: '🔧',
      resources: ['SRE Principles', 'GCP DevOps Tools'],
    },
    {
      title: 'DevOps with AI on AWS',
      description: 'Integrating AI/ML into DevOps workflows',
      progress: 45,
      icon: '🤖',
      resources: ['AI-Powered DevOps', 'AWS AI Services'],
    },
    {
      title: 'MLOps Engineering',
      description: 'Machine Learning Operations and pipeline automation',
      progress: 40,
      icon: '🧠',
      resources: ['ML Pipeline Design', 'Model Deployment'],
    },
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-cyan-400 text-sm uppercase tracking-wider mb-2">
            Always Growing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Currently <span className="text-cyan-400">Learning</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Staying ahead with the latest technologies and best practices in DevOps and Cloud Engineering
          </p>
        </motion.div>

        {/* Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl"
                >
                  {item.icon}
                </motion.div>

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
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
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
            </motion.div>
          ))}
        </div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.a
            href="https://github.com/nihharikadubey"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Follow My Learning Journey
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(CurrentlyLearning, 'currently-learning');