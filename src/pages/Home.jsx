import PageMeta from '../components/PageMeta.jsx';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import BrandLogos from '../components/BrandLogos.jsx';
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
      <PageMeta
        title="Sports Management Careers, Courses and Sports Jobs"
        description="KORE 360 is Krish Lalwani's sports management platform: courses, 1:1 clarity calls, and real sports jobs and internships to help you build a career in sports management."
        path="/"
      />
      <Hero />
      <Marquee />
      <BrandLogos />
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
