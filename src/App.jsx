import { useEffect } from 'react';
import { ACCENT } from './data.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Sessions from './components/Sessions.jsx';
import Courses from './components/Courses.jsx';
import Careers from './components/Careers.jsx';
import Events from './components/Events.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import StickyCta from './components/StickyCta.jsx';

export default function App() {
  useEffect(() => {
    document.getElementById('root')?.style.setProperty('--accent', ACCENT);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Sessions />
        <Courses />
        <Careers />
        <Events />
        <About />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
