import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiClock, FiShield, FiUsers, FiAward, FiArrowRight, FiChevronLeft, FiChevronRight, FiSmartphone, FiTool, FiMonitor, FiWifi, FiServer, FiCpu, FiBriefcase, FiX } from 'react-icons/fi';
import { products } from '../data/products';
import { services } from '../data/services';
import { useBooking } from '../context/BookingContext';



import hero1 from '../assets/BG.png';
import hero2 from '../assets/visax.jpg';
import ctaBg from '../assets/IMG_2126.PNG';


const heroSlides = [
  { image: hero1, headline: 'Enhancing Your', accent: 'Digital', tail: 'Experience', sub: 'Premium gadget sales, expert repairs & tech solutions.' },
  { image: hero2, headline: 'Repairs You Can', accent: 'Trust,', tail: 'Results You\'ll Love', sub: 'Fast, genuine, and affordable phone & laptop repair services.' },
];

// Floating particle element
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full bg-white/10 animate-pulse" style={style} />
);

const serviceIcons: Record<string, React.ReactNode> = {
  FiSmartphone: <FiSmartphone size={24} />,
  FiTool: <FiTool size={24} />,
  FiMonitor: <FiMonitor size={24} />,
  FiWifi: <FiWifi size={24} />,
  FiServer: <FiServer size={24} />,
  FiCpu: <FiCpu size={24} />,
  FiBriefcase: <FiBriefcase size={24} />,
};

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { openBooking } = useBooking();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 20000);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const fadeAnim = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' as const } }, // Optimized duration
    exit: { opacity: 0, transition: { duration: 1.5, ease: 'easeIn' as const } },
  };

  // Per-element animation helper
  const textAnim = (delayIdx: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delayIdx * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  const particles = [
    { width: 8, height: 8, top: '20%', left: '10%' },
    { width: 5, height: 5, top: '70%', left: '15%' },
    { width: 12, height: 12, top: '40%', right: '12%' },
    { width: 6, height: 6, top: '80%', right: '20%' },
    { width: 10, height: 10, top: '15%', right: '35%' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden bg-[#0A1F44]">

        {/* Parallax slider background */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, willChange: 'transform, opacity' }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeAnim}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={heroSlides[current].image}
                className={`w-full h-full object-cover object-center transform-gpu transition-all duration-700 ${current === 1 ? 'blur-[1px] brightness-[0.8]' : ''}`}
                alt="Bellstech hero"
                loading="eager"
                fetchPriority="high"
                style={{ backfaceVisibility: 'hidden' }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Solid overlays */}
        <div className="absolute inset-0 bg-[#0A1F44]/75 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[#1D6FEB]/10 z-10 pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute inset-0 z-11 pointer-events-none overflow-hidden">
          {particles.map((p, i) => (
            <Particle key={i} style={{ ...p, position: 'absolute' }} />
          ))}
        </div>

        {/* Mesh grid overlay (Cleaned up to be very subtle solid lines) */}
        <div className="absolute inset-0 z-10 opacity-[0.02] pointer-events-none"
          style={{
            backgroundColor: '#0A1F44',
            transform: 'translateZ(0)'
          }}
        />

        {/* Hero content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
            <motion.div className="max-w-6xl mx-auto w-full">
              <motion.h1
                key={`headline-${current}`}
                {...textAnim(0)}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-heading font-bold text-white leading-tight mb-6"
              >
                {heroSlides[current].headline}{' '}
                <span className="relative inline-block">
                  <span className="text-[#38BDF8]">
                    {heroSlides[current].accent}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-[#1D6FEB] blur-sm" />
                </span>
                {heroSlides[current].tail && (
                  <><br /><span className="text-white">{heroSlides[current].tail}</span></>
                )}
              </motion.h1>

              <motion.p
                key={`sub-${current}`}
                {...textAnim(1)}
                className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-body"
              >
                {heroSlides[current].sub}
              </motion.p>

              <motion.div
                {...textAnim(2)}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  to="/services"
                  className="group relative overflow-hidden bg-[#1D6FEB] text-white px-9 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#1D6FEB]/40 hover:shadow-[#1D6FEB]/60 transition-shadow"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                <Link
                  to="/shop"
                  className="group border-2 border-white/50 hover:border-white text-white hover:bg-white hover:text-[#0A1F44] px-9 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300"
                >
                  Shop Now
                </Link>
              </motion.div>
            </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-[#0A1F44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3">Why Us</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Why Choose Bellstech?</h2>
            <div className="w-20 h-1.5 bg-[#1D6FEB] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiClock size={28} />, title: 'Fast Repairs', desc: 'Quick turnaround times to get you back online fast.' },
              { icon: <FiShield size={28} />, title: 'Genuine Products', desc: '100% authentic gadgets and replacement parts.' },
              { icon: <FiUsers size={28} />, title: 'Expert Team', desc: 'Highly skilled technicians you can trust.' },
              { icon: <FiAward size={28} />, title: 'Trusted Service', desc: 'Top-rated customer satisfaction nationwide.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.08)' }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 text-center cursor-default transition-all"
              >
                <div className="w-14 h-14 bg-[#1D6FEB]/10 text-[#38BDF8] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SNAPSHOT ── */}
      <section className="py-24 bg-[#081126]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Our Services</h2>
              <div className="w-16 h-1.5 bg-[#1D6FEB] mt-3 rounded-full" />
            </motion.div>
            <Link to="/services" className="flex items-center gap-2 text-[#38BDF8] font-bold hover:text-white transition-colors">
              View All Services <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.slice(0, 6).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.07)' }}
                className="bg-white/[0.03] backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-[#38BDF8]/50 transition-all duration-500 group shadow-2xl relative overflow-hidden flex flex-col sm:flex-row gap-8 items-start sm:items-center"
              >
                {/* Decorative background glow */}
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#1D6FEB]/10 rounded-full blur-3xl group-hover:bg-[#1D6FEB]/20 transition-colors" />
                
                <div className="w-20 h-20 bg-[#1D6FEB]/10 text-[#38BDF8] rounded-2xl flex-shrink-0 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#1D6FEB] group-hover:text-white transition-all duration-500 shadow-lg shadow-[#1D6FEB]/20">
                  {serviceIcons[s.icon] || <FiSmartphone size={32} />}
                </div>
                
                <div className="relative z-10 flex-grow">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors">{s.title}</h3>
                  <p className="text-[#94A3B8] text-base leading-relaxed mb-4 group-hover:text-white/80 transition-colors">{s.description}</p>
                  
                  <Link to="/services" className="inline-flex items-center gap-2 text-[#38BDF8] font-bold text-sm group-hover:gap-3 transition-all">
                    Learn more <FiArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-[#0A1F44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <span className="inline-block text-[#38BDF8] font-semibold text-sm tracking-widest uppercase mb-3">Bellstech's tech stock</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">Featured Products</h2>
            <div className="w-20 h-1.5 bg-[#1D6FEB] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {products.slice(0, 8).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-[#0D1B33] rounded-2xl overflow-hidden shadow-2xl transition-all border border-white/10 group"
              >
                <div 
                  className="h-52 overflow-hidden bg-white/5 relative cursor-zoom-in"
                  onClick={() => setSelectedImage(p.image)}
                >
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                  <span className="absolute top-4 left-4 bg-[#1D6FEB] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{p.name}</h3>
                  <a href="tel:+2348153838529" className="text-[#38BDF8] font-bold mb-4 block hover:underline transition-all">{p.price}</a>
                  <a
                    href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(p.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center bg-[#1D6FEB] sm:bg-white/5 hover:bg-[#1D6FEB] hover:text-white text-white font-bold py-3 rounded-xl transition-all duration-300 text-sm border border-transparent sm:border-white/10 shadow-lg shadow-[#1D6FEB]/20 sm:shadow-none"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/shop" className="inline-flex items-center gap-2 border-2 border-[#1D6FEB] bg-[#1D6FEB] sm:bg-transparent text-white hover:bg-[#1D6FEB] px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-[#1D6FEB]/20">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section className="relative py-28 overflow-hidden bg-[#0A1F44]">
        <div className="absolute inset-0 z-0">
          <img src={ctaBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-[#0A1F44]/80 backdrop-blur-[2px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundColor: '#1D6FEB' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Need Your Device <span className="text-[#38BDF8]">Fixed?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-xl text-white/75 mb-12"
          >
            Book a repair appointment today and get your gadget back in perfect shape.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(29,111,235,0.6)' }}
            onClick={() => openBooking('repair')}
            className="inline-block bg-[#1D6FEB] text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl transition-shadow"
          >
            Book a Repair & Consultation
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="mt-8 text-white/60"
          >
            <p>Direct contact or one-on-one conversation? Contact us at <a href="tel:+2348153838529" className="text-[#38BDF8] hover:underline">+234 815 383 8529</a></p>
          </motion.div>
        </div>
      </section>




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

export default Home;
