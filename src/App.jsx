import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// Import Hero and Navbar directly (not lazy loaded)
import { Hero, Navbar } from './components';

// Lazy load other components
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Tech = lazy(() => import('./components/Tech'));
const Projects = lazy(() => import('./components/Projects'));
const CurrentlyLearning = lazy(() => import('./components/CurrentlyLearning'));
const Footer = lazy(() => import('./components/Footer'));

// COMPLETE HOMEPAGE WITH ALL SECTIONS
const HomePage = () => {
  return (
    <div className='relative z-10'> 
      {/* COSMIC BACKGROUND - Same as Tech component */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* DEEP SPACE GRADIENT */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, #0a0e2a 0%, #000000 70%)',
          }}
        />

        {/* Static Blue Cloud */}
        <div
          className="absolute rounded-full opacity-10 blur-3xl"
          style={{
            width: '60vw',
            height: '60vh',
            background: 'radial-gradient(circle, #0ea5e9, transparent 70%)',
            left: '20%',
            top: '20%',
          }}
        />

        {/* Dense Starfield Background */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <div
              key={`star-bg-${i}`}
              className="absolute rounded-full bg-white/50"
              style={{
                width: '1px',
                height: '1px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ALL PAGE CONTENT */}
      <div className='relative z-10'>
        <Navbar />
        <Hero />
        
        {/* Other sections with Suspense for lazy loading */}
        <Suspense fallback={null}>
          <About />
        </Suspense>
        
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={null}>
          <Tech />
        </Suspense>
        
        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={null}>
          <CurrentlyLearning />
        </Suspense>
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

// APP WITH COSMIC BACKGROUND
const App = () => {
  return (
    <div className="relative min-h-screen" style={{
      background: 'radial-gradient(ellipse at center, #0a0e2a 0%, #000000 70%)'
    }}>
      <Router future={{
        v7_relativeSplatPath: true,
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;