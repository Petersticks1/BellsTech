import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import { BookingProvider } from './context/BookingContext';


import { FiSmartphone, FiMonitor, FiHeadphones, FiCpu, FiHardDrive, FiCamera, FiWatch, FiTablet } from 'react-icons/fi';
import { motion } from 'framer-motion';
import logo from './assets/bellstech-logo.png';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const Shop = lazy(() => import('./pages/Shop.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

const gadgets = [FiSmartphone, FiMonitor, FiHeadphones, FiCpu, FiHardDrive, FiCamera, FiWatch, FiTablet];

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A1F44] flex items-center justify-center overflow-hidden">
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Central Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8, type: "spring" }}
        className="relative z-10 w-28 h-28 flex items-center justify-center"
      >
        <img 
          src={logo} 
          alt="Bellstech" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" 
        />
      </motion.div>

      {/* Orbiting Gadgets */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {gadgets.map((Icon, i) => {
          const angle = (i / gadgets.length) * 360;
          const radius = 95; // distance from center
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center w-10 h-10 bg-[#1D6FEB]/20 backdrop-blur-sm rounded-xl border border-[#38BDF8]/30 text-[#38BDF8]"
              initial={{ x, y }}
              animate={{ x, y }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Icon size={20} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <BookingProvider>
        <ScrollToTop />
        <SmoothScroll>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="shop" element={<Shop />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
              </Route>
            </Routes>
          </Suspense>
        </SmoothScroll>
      </BookingProvider>
    </HashRouter>

  );
}

export default App;
