import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypeWriter = ({ words = [], className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const word = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else if (!isWaiting) {
        setCurrentText(prev => {
          if (isDeleting) {
            return prev.slice(0, -1);
          }
          return word.slice(0, prev.length + 1);
        });
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isWaiting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-8 bg-cyan-400 ml-1"
      />
    </span>
  );
};

export default TypeWriter;