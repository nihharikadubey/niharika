import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KeyboardGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '?' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const shortcuts = [
    { keys: '↑/↓', action: 'Navigate sections' },
    { keys: 'j/k', action: 'Navigate sections (Vim style)' },
    { keys: 'Home', action: 'Go to top' },
    { keys: 'End', action: 'Go to contact' },
    { keys: 'Ctrl+1-6', action: 'Jump to section' },
    { keys: '?', action: 'Toggle this guide' },
    { keys: 'Esc', action: 'Close dialogs' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[61] w-full max-w-md"
          >
            <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>⌨️</span> Keyboard Shortcuts
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/30"
                  >
                    <kbd className="px-3 py-1 bg-slate-700/50 rounded-md text-cyan-400 font-mono text-sm border border-slate-600/50">
                      {shortcut.keys}
                    </kbd>
                    <span className="text-slate-300 text-sm">
                      {shortcut.action}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-slate-500 text-xs">
                  Press <kbd className="px-2 py-0.5 bg-slate-700/50 rounded text-cyan-400 font-mono">?</kbd> anytime to toggle this guide
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KeyboardGuide;