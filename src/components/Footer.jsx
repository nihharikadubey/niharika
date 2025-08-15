import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const Footer = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#work' },
    { name: 'Skills', href: '#tech' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 1, y: 0 }}
      className='relative bg-transparent pt-20 -mt-20'  // Added padding and negative margin to compensate for fixed header
    >
      
      {/* Contact Icon and Heading - Moved Outside Content Block */}
      <div className='text-center max-w-7xl mx-auto relative z-10 mb-8 bg-transparent'>
        {/* Contact Icon */}
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-block p-3 bg-gradient-to-r from-white/10 to-white/5 rounded-full mb-6 border border-white/20 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl text-slate-200">📧</span>
            </div>
          </motion.div>

        {/* Contact Heading */}
        <motion.h2 
          className={`${styles.sectionHeadText} bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get In Touch
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
      </div>

      {/* Main Content Section */}
      <div className={`${styles.padding} relative bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700/30`}>
        <div className='max-w-7xl mx-auto relative z-10'>

          {/* Main CTA Section */}
          <div className='mb-8 mt-12'>
            <div className='mb-6'>
              <p className='text-cyan-300/90 tracking-widest text-xs uppercase font-medium'>Let's collaborate</p>
              <h3 className='mt-2 text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-teal-200 whitespace-nowrap'>
                Niharika Dubey — Infrastructure & DevOps Engineer
              </h3>
              <p className='mt-3 text-slate-300/90 text-base leading-relaxed max-w-2xl'>
                I'm passionate about building reliable, scalable infrastructure and developer platforms that drive innovation. Let's discuss how we can work together to create exceptional solutions.
              </p>
              
              {/* Buttons moved down to paragraph level */}
              <div className='flex flex-wrap gap-3 mt-6'>
                <a 
                  href='mailto:niharika859@gmail.com' 
                  className='px-6 py-3 rounded-xl text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5'
                >
                  Get In Touch
                </a>
                <a 
                  href='https://drive.google.com/file/d/112yrR6dOKE0YuVO2Fs4PLxSshV76pC0n/view?usp=sharing'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-6 py-3 rounded-xl border border-slate-600/50 bg-slate-800/50 text-slate-200 hover:border-cyan-400/40 hover:bg-slate-700/40 hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10 hover:-translate-y-0.5'
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-700/30'>
            {/* Quick Navigation */}
            <div>
              <h4 className='text-slate-200 font-semibold mb-4 flex items-center gap-2'>
                <span className='w-2 h-2 bg-cyan-400 rounded-full'></span>
                Quick Links
              </h4>
              <div className='grid grid-cols-2 gap-3'>
                {quickLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className='text-slate-400 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group py-1'
                  >
                    <span className='w-1 h-1 bg-slate-500 rounded-full group-hover:bg-cyan-400 transition-colors group-hover:scale-150'></span>
                    <span className='text-sm group-hover:translate-x-1 transition-transform duration-300'>
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className='text-slate-200 font-semibold mb-4 flex items-center gap-2'>
                <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                Connect With Me
              </h4>
              <div className='flex flex-wrap gap-4'>
                <a
                  href='https://linkedin.com/in/nihharikadubey'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-slate-400 hover:text-blue-300 transition-all duration-300 group'
                  aria-label='LinkedIn'
                >
                  <div className='w-8 h-8 bg-slate-800/50 border border-slate-600/50 rounded-lg flex items-center justify-center group-hover:bg-blue-900/30 group-hover:border-blue-400/30 transition-all duration-300'>
                    <svg className='w-4 h-4 group-hover:scale-110 transition-transform' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M20.4 0H3.6C1.6 0 0 1.6 0 3.6v16.8C0 22.4 1.6 24 3.6 24h16.8c2 0 3.6-1.6 3.6-3.6V3.6C24 1.6 22.4 0 20.4 0zM7.2 20.4H3.6V9.6h3.6v10.8zM5.4 8c-1.2 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1zm15 12.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.6V9.6h3.6v1.5c.5-.9 1.7-1.8 3.5-1.8 3.8 0 4.5 2.5 4.5 5.7v5.4z' />
                    </svg>
                  </div>
                  <span className='text-sm font-medium'>LinkedIn</span>
                </a>

                <a
                  href='https://github.com/nihharikadubey'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-all duration-300 group'
                  aria-label='GitHub'
                >
                  <div className='w-8 h-8 bg-slate-800/50 border border-slate-600/50 rounded-lg flex items-center justify-center group-hover:bg-slate-700/50 group-hover:border-slate-400/30 transition-all duration-300'>
                    <svg className='w-4 h-4 group-hover:scale-110 transition-transform' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.8-1.4-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.2 0 0 1.1-.3 3.5 1.2a12 12 0 0 1 6.2 0c2.4-1.5 3.5-1.2 3.5-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z' />
                    </svg>
                  </div>
                  <span className='text-sm font-medium'>GitHub</span>
                </a>

                <a
                  href='mailto:niharika859@gmail.com'
                  className='flex items-center gap-2 text-slate-400 hover:text-teal-300 transition-all duration-300 group'
                  aria-label='Email'
                >
                  <div className='w-8 h-8 bg-slate-800/50 border border-slate-600/50 rounded-lg flex items-center justify-center group-hover:bg-teal-900/30 group-hover:border-teal-400/30 transition-all duration-300'>
                    <svg className='w-4 h-4 group-hover:scale-110 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <span className='text-sm font-medium'>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom utility row */}
      <div className={`${styles.paddingX} py-6 relative bg-gradient-to-r from-slate-900/50 via-slate-800/30 to-slate-900/50`}>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10'>
          <div className='flex items-center gap-3'>
            {/* Brand Icon */}
            <div className='w-8 h-8 bg-slate-800/50 border border-slate-600/30 rounded-lg flex items-center justify-center'>
              <span className='text-slate-300 font-bold text-xs'>ND</span>
            </div>
            <div className='flex items-center gap-2 text-slate-400/80 text-sm'>
              <span>© {new Date().getFullYear()} Niharika Dubey</span>
              <span className='opacity-60'>•</span>
              <span className='opacity-80'>All rights reserved</span>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className='flex items-center gap-2 bg-slate-800/30 border border-slate-600/30 rounded-full px-4 py-2'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-slate-300 text-sm font-medium'>Available for opportunities</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default SectionWrapper(Footer, "footer");