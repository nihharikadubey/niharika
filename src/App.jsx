import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Hero, Navbar } from './components';
import { PerformanceProvider } from './context/PerformanceContext';

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
  return (
    <div className='relative z-10'> 
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <Suspense fallback={<LoadingSection />}>
        <About />
      </Suspense>
      <div style={{ 
        position: 'relative',
        zIndex: 10
      }}>
        <Suspense fallback={<LoadingSection />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingSection />}>
          <Projects />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingSection />}>
        <Tech />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Footer/>
      </Suspense>
    </div>
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