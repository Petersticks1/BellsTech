import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import ScrollToTop from './components/ScrollToTop';
import { BookingProvider } from './context/BookingContext';


// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Services = lazy(() => import('./pages/Services.tsx'));
const Shop = lazy(() => import('./pages/Shop.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A1F44] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#1D6FEB] border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>

  );
}

export default App;
