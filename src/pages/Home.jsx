import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Sessions from '../components/Sessions.jsx';
import Courses from '../components/Courses.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Careers from '../components/Careers.jsx';
import Events from '../components/Events.jsx';
import Instagram from '../components/Instagram.jsx';
import FAQ from '../components/FAQ.jsx';
import StickyCta from '../components/StickyCta.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Sessions />
      <Courses />
      <Testimonials />
      <Careers />
      <Events />
      <Instagram />
      <FAQ />
      <StickyCta />
    </>
  );
}
