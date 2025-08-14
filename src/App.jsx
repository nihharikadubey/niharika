import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Hero, Navbar, Tech, Projects, Footer } from './components';
import Experience from './components/Experience'; // Direct import for testing

const HomePage = () => {
  return (
    <div className='relative z-10'> 
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <div style={{ 
        position: 'relative',
        zIndex: 10
      }}>
        <Experience />
        <Projects />
      </div>
      <Tech />
      <Footer/>
    </div>
  );
};

const App = () => {
  return (
    <div className="relative min-h-screen bg-primary">
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