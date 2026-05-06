import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiTool, FiMonitor, FiWifi, FiServer, FiCpu, FiBriefcase } from 'react-icons/fi';

import { services } from '../data/services';
import pageHero from '../assets/IMG_7998.PNG';

const iconMap: Record<string, React.ReactNode> = {
  FiSmartphone: <FiSmartphone size={32} />,
  FiTool: <FiTool size={32} />,
  FiMonitor: <FiMonitor size={32} />,
  FiWifi: <FiWifi size={32} />,
  FiServer: <FiServer size={32} />,
  FiCpu: <FiCpu size={32} />,
  FiBriefcase: <FiBriefcase size={32} />
};

const Services = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 flex flex-col h-full transition-all"
            >
              <div className="w-14 h-14 bg-[#1D6FEB]/10 text-[#38BDF8] rounded-2xl flex items-center justify-center mb-6">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">{service.title}</h3>
              <p className="text-[#94A3B8] mb-8 flex-grow leading-relaxed">{service.description}</p>
              <a
                href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I'd%20like%20to%20enquire%20about%20${encodeURIComponent(service.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full text-center bg-[#1D6FEB] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl transition-opacity shadow-lg shadow-[#1D6FEB]/20"
              >
                Enquire via WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="relative bg-[#0A1F44] rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[#1D6FEB]/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Not sure what you need?</h2>
            <p className="text-lg text-white/70 mb-8">Reach out to our experts for a free consultation.</p>
            <Link
              to="/contact"
              className="inline-block bg-[#1D6FEB] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#38BDF8] transition-colors shadow-xl"
            >
              Contact Us Now
            </Link>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
