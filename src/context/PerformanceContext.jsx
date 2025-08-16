import { createContext, useContext, useEffect, useState } from 'react';
import { isMobile, isTablet, shouldReduceMotion } from '../utils/deviceDetect';

const PerformanceContext = createContext();

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider = ({ children }) => {
  const [performanceMode, setPerformanceMode] = useState('auto');
  const [settings, setSettings] = useState({
    enableAnimations: true,
    enableParticles: true,
    enableComplexEffects: true,
    particleCount: 'normal',
    animationSpeed: 1,
  });

  useEffect(() => {
    // Auto-detect and set performance mode
    const detectPerformance = () => {
      const isMobileDevice = isMobile();
      const isTabletDevice = isTablet();
      const prefersReducedMotion = shouldReduceMotion();
      
      // Check connection type
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' ||
        connection.saveData === true
      );

      if (prefersReducedMotion || isSlowConnection) {
        // Minimal performance mode
        setSettings({
          enableAnimations: false,
          enableParticles: false,
          enableComplexEffects: false,
          particleCount: 'none',
          animationSpeed: 0,
        });
        setPerformanceMode('minimal');
      } else if (isMobileDevice) {
        // Mobile optimized mode
        setSettings({
          enableAnimations: true,
          enableParticles: false,
          enableComplexEffects: false,
          particleCount: 'low',
          animationSpeed: 0.5,
        });
        setPerformanceMode('mobile');
      } else if (isTabletDevice) {
        // Tablet balanced mode
        setSettings({
          enableAnimations: true,
          enableParticles: true,
          enableComplexEffects: false,
          particleCount: 'medium',
          animationSpeed: 0.75,
        });
        setPerformanceMode('balanced');
      } else {
        // Desktop full mode
        setSettings({
          enableAnimations: true,
          enableParticles: true,
          enableComplexEffects: true,
          particleCount: 'high',
          animationSpeed: 1,
        });
        setPerformanceMode('full');
      }
    };

    detectPerformance();

    // Re-detect on resize
    window.addEventListener('resize', detectPerformance);
    return () => window.removeEventListener('resize', detectPerformance);
  }, []);

  const value = {
    performanceMode,
    settings,
    setPerformanceMode,
    setSettings,
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};