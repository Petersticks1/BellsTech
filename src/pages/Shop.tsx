import { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import pageHero from '../assets/IMG_7998.PNG';

const categories = ['All', 'iPhones & iPads', 'Samsung', 'MacBooks & PCs', 'Consoles & Accessories', 'Starlink & Power'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#F0F6FF]">

      {/* Page Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={pageHero} alt="Shop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F44]/75 via-[#0A1F44]/60 to-[#F0F6FF]" />
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
                  ? 'bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] text-white shadow-lg shadow-[#1D6FEB]/25'
                  : 'bg-white text-[#64748B] hover:bg-[#F0F6FF] border border-[#1D6FEB]/15'
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
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#1D6FEB]/08 group"
            >
              <div className="h-48 overflow-hidden bg-gray-50 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0A1F44] text-xs font-bold px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[#0A1F44] mb-1 line-clamp-2 min-h-[3rem]">{p.name}</h3>
                <p className="text-[#1D6FEB] font-bold mb-4">{p.price}</p>
                <a
                  href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(p.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-[#F0F6FF] hover:bg-gradient-to-r hover:from-[#1D6FEB] hover:to-[#38BDF8] hover:text-white text-[#0A1F44] font-bold py-2.5 rounded-xl transition-all duration-300 text-sm"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-24 text-[#64748B] text-lg">No products found in this category.</p>
        )}
      </div>
    </motion.div>
  );
};

export default Shop;
