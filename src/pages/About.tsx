import { motion } from 'framer-motion';
import { FiCheckCircle, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import pageHero from '../assets/IMG_7998.PNG';
import storeImage from '../assets/IMG_2128.PNG';

const About = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0A1F44]">

      {/* Page Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={pageHero} alt="About Bellstech" className="w-full h-full object-contain md:object-cover" />
        <div className="absolute inset-0 bg-[#0A1F44]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3">
            Who We Are
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-3">
            About Bellstech
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-white/75 text-lg max-w-xl">
            Abeokuta's most trusted gadget and tech solution centre.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-16">
        {/* Brand Story */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2">
            <span className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Enhancing Your Digital Experience</h2>
            <div className="space-y-4 text-[#94A3B8] text-lg leading-relaxed">
              <p>Bellstech (Bells Technology Multiconcept) is Abeokuta's premier destination for gadget sales, professional repairs, and innovative tech solutions.</p>
              <p>Whether you need the latest smartphone, urgent screen replacement, or Starlink internet setup, our expert team delivers swift, reliable, and premium service.</p>
              <p>With a commitment to quality and customer satisfaction, every device we handle meets the highest performance standards.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={storeImage} alt="Bellstech Store" className="w-full h-80 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A1F44]/80 p-8">
                <p className="text-white font-bold text-xl font-heading">Bellstech, Abeokuta</p>
                <p className="text-white/70 text-sm">KOC Plaza, Okeilewo</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-[#1D6FEB] mx-auto rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { title: 'Quality', desc: 'We source only genuine parts and premium products to guarantee longevity.' },
              { title: 'Trust', desc: 'Transparency in pricing and honest diagnostics. We only fix what\'s broken.' },
              { title: 'Innovation', desc: 'Staying ahead with the latest technology and repair techniques.' },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6, backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="bg-white/5 backdrop-blur-sm p-10 rounded-2xl text-center border border-white/10 transition-all">
                <FiCheckCircle className="text-[#38BDF8] w-12 h-12 mx-auto mb-5" />
                <h3 className="text-2xl font-heading font-bold text-white mb-3">{v.title}</h3>
                <p className="text-[#94A3B8]">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-[#0A1F44] rounded-3xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-10 lg:p-16 text-white">
              <h2 className="text-3xl font-heading font-bold mb-8">Visit Our Store</h2>
              <ul className="space-y-5 text-white/75">
                <li className="flex items-start gap-4">
                  <div className="bg-[#1D6FEB]/20 p-2.5 rounded-xl flex-shrink-0"><FiMapPin className="text-[#38BDF8]" size={20} /></div>
                  <div><p className="font-bold text-white mb-1">Address</p><p className="text-sm">KOC Plaza, Before City Computer Village, Behind New SLOT, Opp. FASLINK, Okeilewo, Abeokuta</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#1D6FEB]/20 p-2.5 rounded-xl flex-shrink-0"><FiClock className="text-[#38BDF8]" size={20} /></div>
                  <div><p className="font-bold text-white mb-1">Hours</p><p className="text-sm">Monday – Saturday, 9:00am – 6:00pm</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#1D6FEB]/20 p-2.5 rounded-xl flex-shrink-0"><FiPhone className="text-[#38BDF8]" size={20} /></div>
                  <div><p className="font-bold text-white mb-1">Phone</p><p className="text-sm">08153838529</p></div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#1D6FEB]/20 p-2.5 rounded-xl flex-shrink-0"><FiMail className="text-[#38BDF8]" size={20} /></div>
                  <div><p className="font-bold text-white mb-1">Email</p><p className="text-sm">bellstechmulticoncept@gmail.com</p></div>
                </li>
              </ul>
              <a href="https://maps.app.goo.gl/Ukvtc3HAqxxJA9Lz8" target="_blank" rel="noopener noreferrer"
                className="inline-block mt-8 bg-[#1D6FEB] text-white px-8 py-3.5 rounded-full font-bold hover:opacity-90 shadow-lg">
                Get Directions
              </a>
            </div>
            <div className="lg:w-1/2 min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8256561008064!2d3.3341381!3d7.146197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103a4b0032f6b3cd%3A0xa19f5c40af9dbd50!2sKOC%20Plaza!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Bellstech Location"
                className="w-full h-full min-h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
