import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Hero, Navbar } from './components';
import { PerformanceProvider } from './context/PerformanceContext';
import ScrollProgress from './components/ScrollProgress';
import FloatingNav from './components/FloatingNav';
import KeyboardGuide from './components/KeyboardGuide';
import PageTransition from './components/PageTransition';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import useKeyboardNav from './hooks/useKeyboardNav';
import useAnalytics from './hooks/useAnalytics';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Tech = lazy(() => import('./components/Tech'));
const Projects = lazy(() => import('./components/Projects'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component
const LoadingSection = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-pulse text-slate-400">Loading...</div>
  </div>
);

const HomePage = () => {
  // Enable keyboard navigation
  useKeyboardNav();
  // Enable analytics
  useAnalytics();

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <PageTransition>
      <div className='relative z-10'> 
        <ScrollProgress />
        <FloatingNav />
        <KeyboardGuide />
        <AnalyticsDashboard />
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <div style={{ 
        position: 'relative',
        zIndex: 10
      }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <Tech />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </div>
    </PageTransition>
  );
};

const App = () => {
  return (
    <PerformanceProvider>
      <div className="relative min-h-screen bg-primary">
        <Router future={{
          v7_relativeSplatPath: true,
        }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </PerformanceProvider>
  );
};


export default App;