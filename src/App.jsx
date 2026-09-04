import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ACCENT } from './data.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import ConnectPopup from './components/ConnectPopup.jsx';
import Home from './pages/Home.jsx';

const About = lazy(() => import('./pages/About.jsx'));
const Education = lazy(() => import('./pages/Education.jsx'));
const Management = lazy(() => import('./pages/Management.jsx'));
const Talent = lazy(() => import('./pages/Talent.jsx'));
const BookingConfirmed = lazy(() => import('./pages/BookingConfirmed.jsx'));
const LiveWebinar = lazy(() => import('./pages/LiveWebinar.jsx'));
const ClarityCall = lazy(() => import('./pages/ClarityCall.jsx'));
const Ebook = lazy(() => import('./pages/Ebook.jsx'));
const EbookReader = lazy(() => import('./pages/EbookReader.jsx'));
const QnaCall = lazy(() => import('./pages/QnaCall.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const WhatHappensOnMatchDay = lazy(() => import('./pages/blog/WhatHappensOnMatchDay.jsx'));
const EventBudgetPlanning = lazy(() => import('./pages/blog/EventBudgetPlanning.jsx'));
const FiveThingsIWishIKnew = lazy(() => import('./pages/blog/FiveThingsIWishIKnew.jsx'));
const SportsManagementInternshipsIndia = lazy(() => import('./pages/blog/SportsManagementInternshipsIndia.jsx'));

export default function App() {
  const { pathname } = useLocation();
  // The protected reader is a distraction-free, full-screen surface —
  // the marketing nav/footer/popups would just sit on top of the watermark
  // overlay and controls.
  const isEbookReader = pathname === '/education/ebook/read';

  useEffect(() => {
    document.getElementById('root')?.style.setProperty('--accent', ACCENT);
  }, []);

  return (
    <>
      <SmoothScroll />
      <ScrollToTop />
      {!isEbookReader && <Nav />}
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/management" element={<Management />} />
            <Route path="/talent" element={<Talent />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/education/live-webinar" element={<LiveWebinar />} />
            <Route path="/education/clarity-call" element={<ClarityCall />} />
            <Route path="/education/ebook" element={<Ebook />} />
            <Route path="/education/ebook/read" element={<EbookReader />} />
            <Route path="/education/qa-call" element={<QnaCall />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/what-happens-on-match-day" element={<WhatHappensOnMatchDay />} />
            <Route path="/blogs/event-budget-planning-where-the-money-goes" element={<EventBudgetPlanning />} />
            <Route path="/blogs/5-things-i-wish-i-knew-before-sports-industry" element={<FiveThingsIWishIKnew />} />
            <Route path="/blogs/sports-management-internships-india" element={<SportsManagementInternshipsIndia />} />
            {/* Old top-level paths — keep working for anyone with an existing bookmark/shared link.
                /blog(/*) itself 301s at the edge (see vercel.json) before it ever reaches here. */}
            <Route path="/live-webinar" element={<Navigate to="/education/live-webinar" replace />} />
            <Route path="/clarity-call" element={<Navigate to="/education/clarity-call" replace />} />
            <Route path="/ebook" element={<Navigate to="/education/ebook" replace />} />
            <Route path="/qa-call" element={<Navigate to="/education/qa-call" replace />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isEbookReader && <Footer />}
      {!isEbookReader && <FloatingActions />}
      {!isEbookReader && <ConnectPopup />}
    </>
  );
}
