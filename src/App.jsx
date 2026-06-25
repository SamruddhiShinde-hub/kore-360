import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ACCENT } from './data.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import Home from './pages/Home.jsx';
import Education from './pages/Education.jsx';
import Management from './pages/Management.jsx';
import Talent from './pages/Talent.jsx';

export default function App() {
  useEffect(() => {
    document.getElementById('root')?.style.setProperty('--accent', ACCENT);
  }, []);

  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/management" element={<Management />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
