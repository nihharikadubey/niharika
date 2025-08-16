import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const Counter = ({ value, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const animation = animate(count, value, { duration });
      return animation.stop;
    }
  }, [inView, value, count, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const StatsCounter = () => {
  const stats = [
    {
      value: 6,
      suffix: '+',
      label: 'Years Experience',
      icon: '🚀',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      value: 50,
      suffix: '+',
      label: 'Projects Completed',
      icon: '💼',
      color: 'from-blue-400 to-purple-500',
    },
    {
      value: 30,
      suffix: '+',
      label: 'Happy Clients',
      icon: '😊',
      color: 'from-purple-400 to-pink-500',
    },
    {
      value: 25,
      suffix: '+',
      label: 'Technologies',
      icon: '⚡',
      color: 'from-pink-400 to-red-500',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Impact & <span className="text-cyan-400">Achievements</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Delivering excellence in cloud infrastructure and DevOps engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-4 text-4xl"
              >
                {stat.icon}
              </motion.div>
              
              <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                <Counter value={stat.value} />
                {stat.suffix}
              </div>
              
              <p className="text-white/70 text-sm md:text-base">{stat.label}</p>
              
              {/* Animated underline */}
              <motion.div
                className={`h-1 bg-gradient-to-r ${stat.color} mt-4 rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;