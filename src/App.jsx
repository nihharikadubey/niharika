import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About, Contact, Experience, Hero, Navbar, Tech, Projects, Talks, Footer } from './components';

const HomePage = () => {
  return (
    <div className='relative z-0 bg-primary'>
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Projects />
      {/* <Talks />
      <Contact /> */}
      <Footer/>
    </div>
  );
};

const App = () => {
  return (
    <Router future={{
      v7_relativeSplatPath: true,
    }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
