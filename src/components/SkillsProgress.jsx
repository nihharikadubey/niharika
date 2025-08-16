import { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';

const skills = [
  { name: 'AWS Cloud', level: 95, color: 'from-orange-400 to-orange-600' },
  { name: 'Kubernetes', level: 90, color: 'from-blue-400 to-blue-600' },
  { name: 'Docker', level: 92, color: 'from-cyan-400 to-cyan-600' },
  { name: 'CI/CD Pipeline', level: 88, color: 'from-green-400 to-green-600' },
  { name: 'Terraform', level: 85, color: 'from-purple-400 to-purple-600' },
  { name: 'Jenkins', level: 87, color: 'from-indigo-400 to-indigo-600' },
  { name: 'Python/Shell', level: 82, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Monitoring', level: 90, color: 'from-pink-400 to-pink-600' },
];

const SkillBar = ({ skill, index }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{skill.name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          className="text-cyan-400 font-bold"
        >
          {skill.level}%
        </motion.span>
      </div>
      
      <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={hasAnimated ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={hasAnimated ? { opacity: [0.3, 0.6, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillsProgress = () => {
  return (
    <section className="relative w-full py-20 bg-transparent overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className={`${styles.sectionSubText} text-cyan-400`}>My expertise</p>
          <h2 className={`${styles.sectionHeadText} bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500`}>
            Skills Proficiency
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: 'Projects Completed', value: '50+', icon: '🚀' },
            { label: 'Happy Clients', value: '30+', icon: '😊' },
            { label: 'Years Experience', value: '6+', icon: '📅' },
            { label: 'Technologies', value: '20+', icon: '💻' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-800/30 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 text-center"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-3xl font-bold text-cyan-400 mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapper(SkillsProgress, "skills-progress");