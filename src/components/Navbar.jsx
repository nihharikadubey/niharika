import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { menu, close } from '../assets';
import { isMobile, shouldReduceMotion } from '../utils/deviceDetect';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating water droplet animation
  const WaterDroplet = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
      initial={{ opacity: 0, y: -10, x: Math.random() * 200 }}
      animate={{
        opacity: [0, 0.6, 0],
        y: [0, 20],
        x: [0, Math.random() * 50 - 25],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2,
      }}
    />
  );

  return (
    <motion.nav 
      className={`sm:px-16 px-6 w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg shadow-cyan-500/10' 
          : 'bg-slate-900/70 backdrop-blur-md border-b border-white/5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
    >
      {/* Floating water droplets - disabled on mobile */}
      {!isMobile() && !shouldReduceMotion() && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <WaterDroplet key={i} delay={i * 0.5} />
          ))}
        </div>
      )}

      {/* Ocean wave line - simplified on mobile */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        animate={!isMobile() && !shouldReduceMotion() ? {
          opacity: scrolled ? [0.3, 0.8, 0.3] : [0.1, 0.4, 0.1],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={isMobile() || shouldReduceMotion() ? {
          opacity: scrolled ? 0.5 : 0.2
        } : {}}
      />

      <div className='w-full flex justify-between items-center max-w-7xl mx-auto relative z-10'>
        <Link
          to='/'
          className='flex items-center gap-3'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          {/* Logo with oceanic elements */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ripple effect on hover */}
            <motion.div
              className="absolute -inset-2 rounded-full border border-cyan-400/30 opacity-0"
              whileHover={{ 
                opacity: [0, 1, 0],
                scale: [1, 1.2, 1.4]
              }}
              transition={{ duration: 1 }}
            />
            
            {/* Logo icon */}
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/30"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white text-lg font-bold">N</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className='text-white text-[18px] font-bold cursor-pointer flex items-center'>
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Niharika
              </span>
              <motion.span 
                className='text-cyan-400/80 sm:block hidden ml-2'
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                | Portfolio
              </motion.span>
            </p>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <ul className='list-none hidden sm:flex flex-row gap-8'>
          {navLinks.map((link, index) => (
            <motion.li
              key={link.id}
              className={`${
                active === link.title ? 'text-cyan-300' : 'text-white/80'
              } hover:text-cyan-300 text-[16px] font-medium cursor-pointer relative group transition-colors duration-300`}
              onClick={() => setActive(link.title)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {link.id === 'blog' ? (
                <Link to='/blogs' className="relative z-10">{link.title}</Link>
              ) : (
                <a href={`#${link.id}`} className="relative z-10">{link.title}</a>
              )}
              
              {/* Animated underline */}
              <motion.span 
                className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-300 ${
                  active === link.title ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                initial={{ width: 0 }}
                animate={{ width: active === link.title ? '100%' : '0%' }}
                whileHover={{ width: '100%' }}
              />
              
              {/* Glowing effect on active */}
              {active === link.title && (
                <motion.div
                  className="absolute -inset-2 bg-cyan-400/10 rounded-lg blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <motion.div
            className="relative"
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer filter brightness-0 invert'
              onClick={() => setToggle(!toggle)}
              whileHover={{ scale: 1.1 }}
              animate={{ rotate: toggle ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Ripple effect on tap */}
            <motion.div
              className="absolute -inset-2 rounded-full border border-cyan-400/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: toggle ? [0, 1.2] : 0,
                opacity: toggle ? [0, 1, 0] : 0
              }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Mobile menu */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                className="absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-10"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              >
                <div className="relative p-6 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/20 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5" />
                  
                  {/* Floating bubbles in menu */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>

                  <ul className='list-none flex justify-end items-start flex-col gap-4 relative z-10'>
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.id}
                        className={`${
                          active === link.title ? 'text-cyan-300' : 'text-white/80'
                        } font-medium cursor-pointer text-[15px] hover:text-cyan-300 transition-colors duration-300 relative group w-full text-right`}
                        onClick={() => {
                          setToggle(!toggle);
                          setActive(link.title);
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        whileHover={{ x: -5 }}
                      >
                        {link.id === 'blog' ? (
                          <Link to='/blogs' className="block py-2">{link.title}</Link>
                        ) : (
                          <a href={`#${link.id}`} className="block py-2">{link.title}</a>
                        )}
                        
                        {/* Mobile menu item highlight */}
                        <motion.div
                          className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100"
                          initial={{ scaleY: 0 }}
                          whileHover={{ scaleY: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;