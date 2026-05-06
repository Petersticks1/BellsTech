import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

import { products } from '../data/products';
import pageHero from '../assets/IMG_7998.PNG';
import ctaBg from '../assets/console.png';


const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0A1F44]">

      {/* Page Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={pageHero} alt="Shop" className="w-full h-full object-contain md:object-cover" />
        <div className="absolute inset-0 bg-[#0A1F44]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Browse & Shop
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-3"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/75 text-lg max-w-xl"
          >
            Premium gadgets at the best prices. Enquire via WhatsApp to purchase.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                activeCategory === cat
                  ? 'bg-[#1D6FEB] text-white shadow-lg shadow-[#1D6FEB]/40'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-[#0D1B33] rounded-2xl overflow-hidden shadow-2xl transition-all border border-white/10 group"
            >
            <div 
              className="h-48 overflow-hidden bg-white/5 relative cursor-zoom-in"
              onClick={() => setSelectedImage(p.image)}
            >
              <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                <span className="absolute top-3 left-3 bg-[#1D6FEB] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1 line-clamp-2 min-h-[3rem]">{p.name}</h3>
                <a href="tel:+2348153838529" className="text-[#38BDF8] font-bold mb-4 block hover:underline transition-all">{p.price}</a>
                <a
                  href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(p.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-[#1D6FEB] sm:bg-white/5 hover:bg-[#1D6FEB] hover:text-white text-white font-bold py-2.5 rounded-xl transition-all duration-300 text-sm border border-transparent sm:border-white/10 shadow-lg shadow-[#1D6FEB]/20 sm:shadow-none"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-[#94A3B8] text-lg">No products found in this category.</p>
        )}

        {/* Social Media CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-[#0A1F44] border border-white/10 p-8 md:p-12 text-center"
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img src={ctaBg} alt="" className="w-full h-full object-cover opacity-50 mix-blend-multiply grayscale" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44]/95 via-[#0A1F44]/80 to-[#1D6FEB]/10 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">Want to see more?</h2>
            <p className="text-[#94A3B8] text-lg mb-10 max-w-2xl mx-auto">
              We constantly update our stock with the latest gadgets. Follow us on social media to catch our daily updates and new arrivals.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">

            <a
              href="https://instagram.com/bellstech_"
              target="_blank" rel="noopener noreferrer"
              className="flex justify-center items-center gap-3 bg-[#E1306C] hover:bg-[#C1205C] text-white w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all group shadow-lg shadow-[#E1306C]/30"
            >
              <FiInstagram size={24} className="group-hover:scale-110 transition-transform" />
              <span>Instagram</span>
            </a>
            <a
              href="https://tiktok.com/@Bellstech"
              target="_blank" rel="noopener noreferrer"
              className="flex justify-center items-center gap-3 bg-white hover:bg-gray-100 text-black w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all group shadow-lg shadow-white/10"
            >
              <FaTiktok size={22} className="group-hover:scale-110 transition-transform" />
              <span>TikTok</span>
            </a>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1D6FEB]/10 rounded-full blur-3xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#38BDF8]/5 rounded-full blur-3xl" />
        </div>
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
                alt="Product Full View" 
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

export default Shop;
