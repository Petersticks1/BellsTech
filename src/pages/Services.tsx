import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiTool, FiMonitor, FiWifi, FiServer, FiCpu, FiBriefcase, FiX } from 'react-icons/fi';

import { services } from '../data/services';
import pageHero from '../assets/IMG_7998.PNG';
import ctaBg from '../assets/screen.png';

const iconMap: Record<string, React.ReactNode> = {
  FiSmartphone: <FiSmartphone size={20} />,
  FiTool: <FiTool size={20} />,
  FiMonitor: <FiMonitor size={20} />,
  FiWifi: <FiWifi size={20} />,
  FiServer: <FiServer size={20} />,
  FiCpu: <FiCpu size={20} />,
  FiBriefcase: <FiBriefcase size={20} />
};

const Services = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0A1F44]">

      {/* Page Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={pageHero} alt="Services" className="w-full h-full object-contain md:object-cover" />
        <div className="absolute inset-0 bg-[#0A1F44]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3"
          >
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-3"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/75 text-lg max-w-xl"
          >
            Expert tech solutions tailored to your every need.
          </motion.p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-[#0D1B33] rounded-2xl overflow-hidden shadow-2xl transition-all border border-white/10 group flex flex-col h-full"
            >
              <div 
                className="h-48 overflow-hidden bg-white/5 relative cursor-zoom-in flex-shrink-0"
                onClick={() => setSelectedImage(service.image)}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#1D6FEB]/10 text-[#38BDF8] rounded-xl flex items-center justify-center flex-shrink-0">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-2">{service.title}</h3>
                </div>
                <p className="text-[#94A3B8] mb-6 flex-grow leading-relaxed text-sm">{service.description}</p>
                <a
                  href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I'd%20like%20to%20enquire%20about%20${encodeURIComponent(service.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-[#1D6FEB] sm:bg-white/5 hover:bg-[#1D6FEB] hover:text-white text-white font-bold py-2.5 rounded-xl transition-all duration-300 text-sm border border-transparent sm:border-white/10 shadow-lg shadow-[#1D6FEB]/20 sm:shadow-none"
                >
                  Enquire via WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-[#0A1F44] border border-white/10 p-8 md:p-16 text-center"
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img src={ctaBg} alt="" className="w-full h-full object-cover opacity-25 brightness-75 mix-blend-multiply grayscale" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44]/95 via-[#0A1F44]/85 to-[#1D6FEB]/15 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Not sure what you need?</h2>
            <p className="text-[#94A3B8] text-lg mb-10 max-w-xl mx-auto">
              Reach out to our experts for a free consultation.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#1D6FEB] hover:bg-[#38BDF8] text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-[#1D6FEB]/30"
            >
              Contact Us Now
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1D6FEB]/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* ── IMAGE LIGHTBOX ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Service Full View" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#38BDF8] transition-colors p-2"
              >
                <FiX size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Services;
