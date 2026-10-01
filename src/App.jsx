import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { WaitlistProvider } from './waitlist.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Features from './pages/Features.jsx';
import Waitlist from './pages/Waitlist.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <WaitlistProvider>
      <HashRouter>
        <div className="relative min-h-screen">
          {/* glow */}
          <div className="pointer-events-none fixed left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-mint/10 blur-[160px]" />
          <Cursor />
          <Nav />
          <ScrollToTop />
          <main className="relative pt-20">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </HashRouter>
    </WaitlistProvider>
  );
}
