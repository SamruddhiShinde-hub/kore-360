import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ACCENT } from './data.js';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import ConnectPopup from './components/ConnectPopup.jsx';
import Home from './pages/Home.jsx';

const Education = lazy(() => import('./pages/Education.jsx'));
const Management = lazy(() => import('./pages/Management.jsx'));
const Talent = lazy(() => import('./pages/Talent.jsx'));
const BookingConfirmed = lazy(() => import('./pages/BookingConfirmed.jsx'));
const LiveWebinar = lazy(() => import('./pages/LiveWebinar.jsx'));
const ClarityCall = lazy(() => import('./pages/ClarityCall.jsx'));
const Ebook = lazy(() => import('./pages/Ebook.jsx'));

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
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/education" element={<Education />} />
            <Route path="/management" element={<Management />} />
            <Route path="/talent" element={<Talent />} />
            <Route path="/booking-confirmed" element={<BookingConfirmed />} />
            <Route path="/live-webinar" element={<LiveWebinar />} />
            <Route path="/clarity-call" element={<ClarityCall />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
      <ConnectPopup />
    </>
  );
}
