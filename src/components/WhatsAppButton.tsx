import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
      drag
      dragMomentum={false}
      // Add very loose constraints so it doesn't get totally lost, while remaining flexible
      dragConstraints={{ left: -2000, right: 100, top: -2000, bottom: 100 }}
    >
      <motion.a
        href="https://wa.me/2348153838529"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:shadow-2xl cursor-grab active:cursor-grabbing flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onDragStart={(e) => e.preventDefault()}
      >
        <FaWhatsapp size={32} />
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
