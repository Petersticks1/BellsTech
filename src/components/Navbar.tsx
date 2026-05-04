import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/bellstech-logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const whatsappUrl =
  'https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20book%20a%20repair%20appointment';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_32px_rgba(10,31,68,0.12)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <motion.img
              src={logo}
              alt="Bellstech Logo"
              className="h-11 w-auto drop-shadow-md"
              whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
            />
            <motion.span
              className={`font-heading font-bold text-xl tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-[#0A1F44]' : 'text-white'
              }`}
            >
              Bells<span className="text-[#38BDF8]">tech</span>
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 font-medium text-sm rounded-lg transition-colors duration-200 group ${
                      isActive
                        ? isScrolled ? 'text-[#1D6FEB]' : 'text-[#38BDF8]'
                        : isScrolled ? 'text-[#0D1B2A] hover:text-[#1D6FEB]' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {/* Animated underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#38BDF8] rounded-full transition-all duration-300 ${
                        isActive ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* Glowing CTA */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(29,111,235,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="ml-4 bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-[#1D6FEB]/30 transition-shadow"
            >
              Book a Repair
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#0A1F44]' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <FiX size={26} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <FiMenu size={26} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-[#F0F6FF] text-[#1D6FEB]'
                        : 'text-[#0D1B2A] hover:bg-[#F0F6FF]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-2 bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] text-white px-6 py-3.5 rounded-xl font-bold text-center shadow-lg"
              >
                Book a Repair
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
