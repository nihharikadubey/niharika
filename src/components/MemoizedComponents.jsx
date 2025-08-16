import React from 'react';

// Memoized wrapper for heavy components to prevent unnecessary re-renders
export const MemoizedComponent = React.memo(({ children }) => {
  return <>{children}</>;
}, (prevProps, nextProps) => {
  // Only re-render if children actually changed
  return prevProps.children === nextProps.children;
});

// Debounced scroll handler hook
export const useDebounceScroll = (callback, delay = 100) => {
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [callback, delay]);
};