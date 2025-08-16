import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import { useState } from 'react';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#work' },
    { name: 'Skills', href: '#tech' },
    { name: 'Contact', href: '#contact' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <footer
      id="contact"
      className='relative bg-transparent pt-2 sm:pt-4 -mt-2'  // Reduced padding and negative margin
    >
      
      {/* Contact Icon and Heading - Moved Outside Content Block */}
      <div className='text-center max-w-7xl mx-auto relative z-10 mb-2 sm:mb-4 bg-transparent'>
        {/* Contact Icon */}
        <motion.div 
          className="flex justify-center mb-4"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-700/50 to-slate-600/30 backdrop-blur-sm border border-slate-500/30 flex items-center justify-center">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              className="w-8 h-8 text-slate-300"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
        </motion.div>

        {/* Contact Heading */}
        <motion.h2 
          className={`${styles.sectionHeadText} bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
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
        
        <motion.p 
          className="text-white/70 max-w-2xl mx-auto leading-relaxed text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          Ready to collaborate on your next cloud infrastructure or DevOps project? 
          Let's connect and build something amazing together.
        </motion.p>
      </div>

      {/* Main Content Section */}
      <div className={`${styles.padding} relative bg-gradient-to-br from-slate-900/70 via-slate-800/50 to-slate-900/70 backdrop-blur-sm rounded-2xl border border-slate-700/30`}>
        <div className='max-w-7xl mx-auto relative z-10'>

          {/* Main Contact Form Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-12'>
            {/* Left side - Info */}
            <div>
              <p className='text-cyan-300/90 tracking-widest text-xs uppercase font-medium'>Let's collaborate</p>
              <h3 className='mt-2 text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-teal-200'>
                Niharika Dubey
              </h3>
              <p className='text-cyan-400 text-lg mb-4'>Infrastructure & DevOps Engineer</p>
              <p className='text-slate-300/90 text-base leading-relaxed mb-6'>
                I'm passionate about building reliable, scalable infrastructure and developer platforms that drive innovation. Let's discuss how we can work together to create exceptional solutions.
              </p>
              
              {/* Quick action buttons */}
              <div className='flex flex-wrap gap-3 mb-6'>
                <a 
                  href='https://drive.google.com/file/d/112yrR6dOKE0YuVO2Fs4PLxSshV76pC0n/view?usp=sharing'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/50 text-slate-200 hover:border-cyan-400/40 hover:bg-slate-700/40 hover:text-white transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10 text-sm'
                >
                  📄 Resume
                </a>
                <a 
                  href='https://cal.com/nihharikadubey/30min'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-4 py-2 rounded-lg border border-slate-600/50 bg-slate-800/50 text-cyan-300 hover:border-cyan-400/40 hover:bg-slate-700/40 hover:text-cyan-200 transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/10 text-sm'
                >
                  📅 Schedule Call
                </a>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                      errors.name ? 'border-red-500' : 'border-slate-700/50'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                      errors.email ? 'border-red-500' : 'border-slate-700/50'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                    placeholder="Your Email"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-800/50 border ${
                      errors.message ? 'border-red-500' : 'border-slate-700/50'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none`}
                    placeholder="Your Message"
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-400 text-center"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
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
                    <span className='w-1 h-1 bg-slate-500 rounded-full group-hover:bg-cyan-400 transition-colors duration-200'></span>
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
                    <svg className='w-4 h-4 transition-transform duration-200 group-hover:translate-y-[-2px]' fill='currentColor' viewBox='0 0 24 24'>
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
                    <svg className='w-4 h-4 transition-transform duration-200 group-hover:translate-y-[-2px]' fill='currentColor' viewBox='0 0 24 24'>
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
            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
            <span className='text-slate-300 text-sm font-medium'>Available for opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SectionWrapper(Footer, "footer");