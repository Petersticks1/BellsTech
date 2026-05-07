import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import { BookingProvider } from './context/BookingContext';


import { FiSmartphone, FiMonitor, FiHeadphones, FiCpu, FiHardDrive, FiCamera, FiWatch, FiTablet } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/bellstech-logo.png';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const Shop = lazy(() => import('./pages/Shop.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

const gadgets = [FiSmartphone, FiMonitor, FiHeadphones, FiCpu, FiHardDrive, FiCamera, FiWatch, FiTablet];

// Loading fallback
const PageLoader = ({ isInitial = false }: { isInitial?: boolean }) => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    className="fixed inset-0 z-[9999] bg-[#0A1F44] flex flex-col items-center justify-center overflow-hidden"
  >
    {/* Ambient Background Glows */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1D6FEB]/10 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Central Logo Container */}
      <div className="relative z-20 w-32 h-32 flex flex-col items-center justify-center">
        <motion.div
          animate={{ 
            filter: ["drop-shadow(0 0 10px rgba(56,189,248,0.3))", "drop-shadow(0 0 20px rgba(56,189,248,0.5))", "drop-shadow(0 0 10px rgba(56,189,248,0.3))"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={logo} 
            alt="Bellstech" 
            className="w-full h-full object-contain" 
          />
        </motion.div>
      </div>

      {/* Rotating Tech Ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-white/5 relative">
          {gadgets.map((Icon, i) => {
            const angle = (i / gadgets.length) * 360;
            const radius = 130; 
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-[#38BDF8] shadow-lg shadow-black/20"
                style={{ 
                  left: `calc(50% + ${x}px - 24px)`, 
                  top: `calc(50% + ${y}px - 24px)` 
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Icon size={24} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Decorative Outer Pulse Rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-[#1D6FEB]/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.4, opacity: [0, 0.5, 0] }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: i * 1.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  </motion.div>
);

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time for initial assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Prevent scrolling while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  return (
    <HashRouter>
      <BookingProvider>
        <ScrollToTop />
        <SmoothScroll>
          <AnimatePresence mode="wait">
            {loading && <PageLoader key="preloader" isInitial={true} />}
          </AnimatePresence>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
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
          </motion.div>
        </SmoothScroll>
      </BookingProvider>
    </HashRouter>
  );
}

export default App;
