import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { styles } from '../styles';

// --- Animation helpers - Optimized for faster loading ---
const textVariant = (delay = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { type: "tween", duration: 0.3, delay: delay * 0.5 }
  }
});
const fadeIn = (dir, type, delay, duration) => ({
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { type: "tween", delay: delay * 0.3, duration: duration * 0.5, ease: "easeOut" }
  },
});

// --- Animated counter for stats - Faster animation ---
const AnimatedNumber = ({ value }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (isNaN(end)) return;
    const step = end / (300 / 16); // Reduced from 500ms to 300ms
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setDisplay(value);
      } else setDisplay(Math.floor(start) + "+");
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display}</>;
};

// --- Icon wrapper ---
const IconComponent = ({ children }) => (
  <div className="w-8 h-8">{children}</div>
);
const CloudIcon = () => (
  <IconComponent>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  </IconComponent>
);
const ServerIcon = () => (
  <IconComponent>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="2" y="3" width="20" height="4" rx="1"/>
      <rect x="2" y="9" width="20" height="4" rx="1"/>
      <rect x="2" y="15" width="20" height="4" rx="1"/>
      <circle cx="6" cy="5" r="0.5"/>
      <circle cx="6" cy="11" r="0.5"/>
      <circle cx="6" cy="17" r="0.5"/>
    </svg>
  </IconComponent>
);
const CodeIcon = () => (
  <IconComponent>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
    </svg>
  </IconComponent>
);
const NetworkIcon = () => (
  <IconComponent>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="12" r="2"/>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
    </svg>
  </IconComponent>
);
const SecurityIcon = () => (
  <IconComponent>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  </IconComponent>
);
const MonitorIcon = () => (
  <IconComponent>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  </IconComponent>
);

// --- Services data ---
const services = [
  { title: "Cloud Architecture", description: "Designing scalable cloud-native solutions with AWS, optimizing for security and performance", icon: CloudIcon, technologies: ["AWS","Cloud Native","Scalability","Security"] },
  { title: "DevOps Automation", description: "CI/CD pipelines, Kubernetes, Docker, Terraform deployment automation", icon: CodeIcon, technologies: ["CI/CD","Kubernetes","Docker","Terraform"] },
  { title: "Infrastructure Management", description: "Optimizing UNIX/Linux systems for reliability and speed", icon: ServerIcon, technologies: ["Linux","Performance","Automation","Monitoring"] },
  { title: "Managed File Transfer", description: "Secure file transfer solutions and middleware integration", icon: NetworkIcon, technologies: ["MFT","Middleware","SOA","Integration"] },
  { title: "Security & Compliance", description: "Enterprise-grade security and compliance standards", icon: SecurityIcon, technologies: ["Security","Compliance","Enterprise","Risk"] },
  { title: "Monitoring & Observability", description: "Grafana, Prometheus for proactive system monitoring", icon: MonitorIcon, technologies: ["Grafana","Prometheus","Observability","Analytics"] },
];


const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundY = useTransform(smoothY, [0, 1], ["0%", "32%"]);
  // Disable parallax on mobile to prevent overlap
  const contentY = useTransform(smoothY, [0, 1], window.innerWidth < 768 ? ["0%", "0%"] : ["0%", "-7%"]);

  return (
    <section ref={containerRef} id="about" className="relative w-full min-h-screen overflow-hidden pt-2 sm:pt-16 z-20">
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-0 sm:pt-2 lg:pt-3 pb-0" style={{ y: window.innerWidth < 768 ? 0 : contentY }}>
        {/* Header */}
        <motion.div variants={textVariant()} initial="hidden" whileInView="show" className="mb-2 text-center relative">
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          </div>
          
          <p className="text-cyan-400 tracking-[0.3em] uppercase mb-3">Introduction</p>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">About Me</h2>
          
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
        </motion.div>

        {/* Profile & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mb-2">
          <motion.div variants={fadeIn("left", "spring", 0, 0.5)} className="lg:col-span-4 flex justify-center">
            <img 
              src="/profileND.png" 
              alt="Profile" 
              className="rounded-3xl w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover border border-slate-700 shadow-lg" 
              loading="lazy"
            />
          </motion.div>
          <motion.div variants={fadeIn("right", "spring", 0.1, 0.5)} className="lg:col-span-8 space-y-4 text-slate-300 leading-relaxed mt-10">
            <p><span className="font-bold text-cyan-400">6+ years</span> of experience in cloud infrastructure, DevOps automation, and enterprise integration across major sectors.</p>
            <p>Expert in AWS, Kubernetes, Docker, Terraform — focusing on automation, security, and operational excellence.</p>
            <p>Passionate about building resilient systems that drive digital transformation.</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {['AWS Cloud', 'Kubernetes', 'DevOps', 'Infrastructure'].map((skill, i) => (
                <span key={i} className="px-6 py-2 rounded-2xl bg-slate-800 text-slate-300 border border-slate-700">{skill}</span>
              ))}
            </div>
          </motion.div>
        </div>


        {/* Enhanced Core Expertise Section — as provided */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView="show"
          viewport={{ once: true }}
          className="mt-8 sm:mt-16"
        >
          <div className="text-center mb-2">
            <motion.h3 
              className="text-4xl font-black text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Core Expertise
            </motion.h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="group bg-transparent backdrop-blur-sm rounded-xl p-6 border border-slate-700/40 hover:border-slate-500/60 transition-all duration-300 relative overflow-hidden"
                whileHover={{
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => setHoveredCard(`service-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0 }}
                animate={isVisible ? { 
                  opacity: 1
                } : {}}
                transition={{
                  type: 'tween',
                  duration: 0.2,
                  delay: index * 0.02
                }}
              >
                <div 
                  className="absolute inset-0 bg-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"
                />
                
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <div
                      className="w-full h-full flex items-center justify-center transition-all duration-200"
                      style={{
                        filter: hoveredCard === `service-${index}` ? 'brightness(1.3)' : 'brightness(1)',
                        transform: hoveredCard === `service-${index}` ? 'translateY(-2px)' : 'translateY(0)'
                      }}
                    >
                      <service.icon />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-slate-100 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-lg bg-slate-800/40 text-slate-500 border border-slate-700/40 font-medium hover:bg-slate-700/40 hover:text-slate-400 hover:border-slate-600/40 transition-all duration-300 hover:scale-105 transform transition-transform"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
