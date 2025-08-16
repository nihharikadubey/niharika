import { useEffect } from 'react';

const useKeyboardNav = () => {
  useEffect(() => {
    const sections = ['hero', 'about', 'work', 'projects', 'tech', 'contact'];
    let currentIndex = 0;

    const handleKeyPress = (e) => {
      // Check if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          currentIndex = Math.min(currentIndex + 1, sections.length - 1);
          document.getElementById(sections[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
          break;
        
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          if (currentIndex === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            document.getElementById(sections[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        
        case 'Home':
          e.preventDefault();
          currentIndex = 0;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        
        case 'End':
          e.preventDefault();
          currentIndex = sections.length - 1;
          document.getElementById(sections[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
          break;
        
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            if (index < sections.length) {
              currentIndex = index;
              if (index === 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                document.getElementById(sections[currentIndex])?.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
          break;
      }
    };

    // Update current index based on scroll position
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          currentIndex = i;
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useKeyboardNav;