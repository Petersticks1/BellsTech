import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import pageHero from '../assets/IMG_7998.PNG';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:bellstechmulticoncept@gmail.com?subject=Enquiry from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const contactItems = [
    { icon: <FiMapPin size={20} />, title: 'Address', value: 'KOC Plaza, Before City Computer Village, Behind New SLOT, Opp. FASLINK, Okeilewo, Abeokuta' },
    { icon: <FiPhone size={20} />, title: 'Phone / WhatsApp', value: '08153838529' },
    { icon: <FiMail size={20} />, title: 'Email', value: 'bellstechmulticoncept@gmail.com' },
    { icon: <FiClock size={20} />, title: 'Hours', value: 'Monday – Saturday, 9:00am – 6:00pm' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0A1F44]">

      {/* Page Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={pageHero} alt="Contact Bellstech" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0A1F44]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Reach Out
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-3"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/75 text-lg max-w-xl"
          >
            We're here to help. Chat on WhatsApp or send us a message below.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left: Info */}
          <div className="lg:w-2/5 space-y-6">
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-heading font-bold text-white mb-6">Get In Touch</h3>
              <ul className="space-y-5">
                {contactItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="bg-[#1D6FEB]/10 text-[#38BDF8] p-3 rounded-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-white mb-0.5">{item.title}</p>
                      <p className="text-[#94A3B8] text-sm leading-relaxed">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Social */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-bold text-white mb-4">Follow Us</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/bellstech_" target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 text-white hover:bg-[#1D6FEB] transition-all">
                    <FiInstagram size={22} />
                  </a>
                  <a href="https://wa.me/2348153838529" target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 text-white hover:bg-[#25D366] transition-all">
                    <FaWhatsapp size={22} />
                  </a>
                  <a href="https://tiktok.com/@Bellstech" target="_blank" rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 text-white hover:bg-black transition-all">
                    <FaTiktok size={22} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA Card */}
            <motion.a
              href="https://wa.me/2348153838529"
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(37,211,102,0.3)' }}
              className="flex items-center gap-5 bg-[#25D366] text-white p-6 rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="bg-white/20 p-3 rounded-xl">
                <FaWhatsapp size={32} />
              </div>
              <div>
                <p className="font-bold text-xl font-heading">Chat on WhatsApp</p>
                <p className="text-white/80 text-sm">Fastest response — reply in minutes</p>
              </div>
            </motion.a>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/5"
          >
            <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 h-full">
              <h3 className="text-2xl font-heading font-bold text-white mb-8">Send Us a Message</h3>

              {submitted ? (
                <div className="bg-white/5 text-white p-10 rounded-xl text-center border border-white/10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-[#1D6FEB] text-white rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold">Preparing your message…</h4>
                  <p className="text-[#94A3B8]">Opening your email client.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-bold text-white mb-2">Your Name</label>
                      <input
                        type="text" id="contact-name" required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-bold text-white mb-2">Email Address</label>
                      <input
                        type="email" id="contact-email" required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-bold text-white mb-2">Message</label>
                    <textarea
                      id="contact-message" rows={7} required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#38BDF8] transition-all resize-none"
                      placeholder="How can we help you today?"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(29,111,235,0.35)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#1D6FEB] text-white font-bold py-4 rounded-xl shadow-lg transition-shadow text-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
