import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';

// Lazy load the Globe component
const Globe = lazy(() => import('./Globe'));

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

      // Clear status after 5s
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <footer
      id="contact"
      className="relative bg-transparent pt-2 sm:pt-4 -mt-2 overflow-hidden"
    >
      {/* Decorative Blobs */}
      

      {/* Heading + Globe (mobile) */}
      <div className="text-center max-w-7xl mx-auto relative z-10 mb-8 sm:mb-12">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-blue-500/5 to-transparent rounded-3xl blur-3xl opacity-50 animate-pulse"></div>
        
        <div className="lg:hidden mb-6">
          <div className="h-48 w-48 mx-auto relative">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
              </div>
            }>
              <Globe />
            </Suspense>
          </div>
        </div>

        {/* Enhanced Contact Icon with animation */}
        <motion.div 
          className="flex justify-center mb-6"
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Heading with glow effect */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`${styles.sectionHeadText} relative`}>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 blur-2xl opacity-30"></span>
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 font-black">
              Get In Touch
            </span>
          </h2>
        </motion.div>

        {/* Enhanced Divider with floating dots */}
        <motion.div
          className="flex items-center justify-center my-8 relative"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-cyan-400"></div>
            <motion.div 
              className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50"
              animate={{ y: window.innerWidth > 640 ? [0, -5, 0] : 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <div className="w-16 sm:w-32 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400"></div>
            <motion.div 
              className="w-3 h-3 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full shadow-lg shadow-blue-400/50"
              animate={{ y: window.innerWidth > 640 ? [0, -5, 0] : 0 }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            ></motion.div>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-teal-400 via-teal-400/50 to-transparent"></div>
          </div>
        </motion.div>

        {/* Enhanced description with better styling */}
        <motion.div
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-lg sm:text-xl text-slate-200/90 leading-relaxed text-center px-4 font-light">
            Ready to <span className="text-cyan-300 font-semibold">collaborate</span> on your next 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 font-semibold mx-2">
              cloud infrastructure
            </span> 
            or <span className="text-blue-300 font-semibold">DevOps</span> project?
          </p>
          <p className="text-base sm:text-lg text-slate-300/70 mt-3 text-center px-4">
            Let's connect and build something <span className="text-teal-300 italic">amazing</span> together.
          </p>
        </motion.div>
      </div>

      {/* Main Content Section */}
      <div className={`${styles.padding} relative bg-transparent rounded-2xl border border-slate-700/30 shadow-2xl shadow-cyan-400/5`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 mt-12">
            {/* Globe (left, desktop only) */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="relative h-56 w-full mb-2">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                  </div>
                }>
                  <Globe />
                </Suspense>
                <span className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-pulse blur-lg opacity-50 z-[-1]" />
              </div>
              <p className="text-center text-cyan-400/70 text-xs italic mt-2 tracking-wide">
                Connecting globally through technology
              </p>
            </div>

            {/* Info Block (center) */}
            <div className="mt-8 lg:mt-12 relative">
              <motion.p
                className="text-cyan-300/80 tracking-wide text-xs uppercase font-bold mb-2"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >Let&apos;s collaborate</motion.p>
              <motion.h3
                className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-200 to-teal-200 tracking-tight"
                initial={{ letterSpacing: '0.1em', opacity: 0 }}
                whileInView={{ opacity: 1, letterSpacing: '0em' }}
                transition={{ duration: 0.7, delay: 0.22 }}
              >Niharika Dubey</motion.h3>
              <p className="text-cyan-400 text-lg mb-4">Infrastructure & DevOps Engineer</p>
              {/* Quick action buttons */}
              <div className="flex flex-col gap-3 mb-6 mt-6">
                <a
                  href='https://drive.google.com/file/d/112yrR6dOKE0YuVO2Fs4PLxSshV76pC0n/view?usp=sharing'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300'
                >
                  <span className='text-xl'>📄</span>
                  <span className='font-semibold text-base bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-purple-200'>
                    Download Resume
                  </span>
                  <svg className='w-4 h-4 text-blue-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                </a>
                <a
                  href='https://cal.com/nihharikadubey/30min'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 backdrop-blur-sm rounded-xl border border-teal-500/20 hover:from-teal-600/20 hover:to-cyan-600/20 hover:border-teal-400/40 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300'
                >
                  <span className='text-xl'>📅</span>
                  <span className='font-semibold text-base bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent group-hover:from-teal-200 group-hover:to-cyan-200'>
                    Schedule a Call
                  </span>
                  <svg className='w-4 h-4 text-teal-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Form (right) */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`peer w-full px-5 py-3 rounded-xl bg-slate-800/60 border-2 shadow-inner border-transparent focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-200/20 text-white placeholder-slate-400 transition-all duration-200 ${errors.name ? 'border-red-500 ring-red-300' : ''}`}
                    placeholder="Your Name"
                    autoComplete="off"
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
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
                    className={`peer w-full px-5 py-3 rounded-xl bg-slate-800/60 border-2 shadow-inner border-transparent focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-200/20 text-white placeholder-slate-400 transition-all duration-200 ${errors.email ? 'border-red-500 ring-red-300' : ''}`}
                    placeholder="Your Email"
                    autoComplete="off"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
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
                    className={`peer w-full px-5 py-3 rounded-xl bg-slate-800/60 border-2 shadow-inner border-transparent focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-200/20 text-white placeholder-slate-400 transition-all duration-200 resize-none ${errors.message ? 'border-red-500 ring-red-300' : ''}`}
                    placeholder="Your Message"
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>
                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0px 0px 16px 2px #0fd1ff44" }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex gap-2 justify-center items-center">
                      <svg className="w-5 h-5 animate-spin text-white/80" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="#40e" strokeWidth="4" fill="none"/><path className="opacity-75" fill="#3cf" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12z" /></svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </motion.button>
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-400 text-center mt-2"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Quick Links + Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-700/30">
            {/* Quick Navigation */}
            <div>
              <h4 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Quick Links
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group py-1"
                  >
                    <span className="w-1 h-1 bg-slate-600 rounded-full group-hover:bg-cyan-400 transition-colors duration-200"></span>
                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Connect With Me
              </h4>
              <div className="flex flex-wrap gap-3">
                {/* LinkedIn */}
                <a
                  href='https://linkedin.com/in/nihharikadubey'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-blue-500/10 to-sky-500/10 backdrop-blur-sm rounded-lg border border-blue-500/30 hover:from-blue-500/20 hover:to-sky-500/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300'
                  aria-label='LinkedIn'
                >
                  <div className='w-9 h-9 bg-[#0077B5] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#0066A0] transition-all duration-300'>
                    <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M20.4 0H3.6C1.6 0 0 1.6 0 3.6v16.8C0 22.4 1.6 24 3.6 24h16.8c2 0 3.6-1.6 3.6-3.6V3.6C24 1.6 22.4 0 20.4 0zM7.2 20.4H3.6V9.6h3.6v10.8zM5.4 8c-1.2 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1zm15 12.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.6V9.6h3.6v1.5c.5-.9 1.7-1.8 3.5-1.8 3.8 0 4.5 2.5 4.5 5.7v5.4z' />
                    </svg>
                  </div>
                  <span className='font-semibold text-sm bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent'>
                    LinkedIn
                  </span>
                </a>
                
                {/* GitHub */}
                <a
                  href='https://github.com/nihharikadubey'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-slate-500/10 to-slate-600/10 backdrop-blur-sm rounded-lg border border-slate-500/30 hover:from-slate-500/20 hover:to-slate-600/20 hover:border-slate-400/50 hover:shadow-lg hover:shadow-slate-500/10 transition-all duration-300'
                  aria-label='GitHub'
                >
                  <div className='w-9 h-9 bg-[#181717] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#0d1117] transition-all duration-300'>
                    <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1.9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.8-1.4-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.2 0 0 1.1-.3 3.5 1.2a12 12 0 0 1 6.2 0c2.4-1.5 3.5-1.2 3.5-1.2.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z' />
                    </svg>
                  </div>
                  <span className='font-semibold text-sm bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent'>
                    GitHub
                  </span>
                </a>
                
                {/* Email */}
                <a
                  href='mailto:niharika859@gmail.com'
                  className='group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-lg border border-emerald-500/30 hover:from-emerald-500/20 hover:to-teal-500/20 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300'
                  aria-label='Email'
                >
                  <div className='w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300'>
                    <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <span className='font-semibold text-sm bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>
                    Email
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom utility row */}
      <div className={`${styles.paddingX} py-6 relative bg-gradient-to-r from-slate-900/50 via-slate-800/30 to-slate-900/50`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800/50 border border-slate-600/30 rounded-lg flex items-center justify-center">
              <span className="text-slate-300 font-bold text-xs">ND</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400/80 text-sm">
              <span>© {new Date().getFullYear()} Niharika Dubey</span>
              <span className="opacity-60">•</span>
              <span className="opacity-80">All rights reserved</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/30 border border-slate-600/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-green-400/30" />
            <span className="text-slate-300 text-sm font-medium">Available for opportunities</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 blur-xl opacity-50"></div>
      </div>
    </footer>
  );
};

export default SectionWrapper(Footer, "footer");
