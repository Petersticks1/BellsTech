import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiClock, FiShield, FiUsers, FiAward, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { products } from '../data/products';
import { services } from '../data/services';

import hero1 from '../assets/IMG_7174.JPG';
import hero2 from '../assets/IMG_4340.JPG';
import hero3 from '../assets/IMG_2128.PNG';

const heroSlides = [
  { image: hero1, headline: 'Enhancing Your', accent: 'Digital', tail: 'Experience', sub: 'Premium gadget sales, expert repairs & tech solutions in Abeokuta.' },
  { image: hero2, headline: 'Repairs You Can', accent: 'Trust,', tail: 'Results You\'ll Love', sub: 'Fast, genuine, and affordable phone & laptop repair services.' },
  { image: hero3, headline: 'Your Tech Store,', accent: 'Redefined', tail: '', sub: 'From iPhones to Starlink — everything tech, under one roof.' },
];

// Floating particle element
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div className="absolute rounded-full bg-white/10 animate-pulse" style={style} />
);

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const goTo = (idx: number, dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDirection(dir);
    setCurrent(idx);
    startInterval();
  };
  const prev = () => goTo((current - 1 + heroSlides.length) % heroSlides.length, -1);
  const next = () => goTo((current + 1) % heroSlides.length, 1);

  const bezier: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
  const slideAnim = (dir: number) => ({
    initial: { x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.05 },
    animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.85, ease: bezier } },
    exit: { x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.95, transition: { duration: 0.85, ease: bezier } },
  });

  // Per-element animation helper (avoids Framer Motion v12 Variants type issues)
  const textAnim = (delayIdx: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delayIdx * 0.15 + 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  });

  const particles = [
    { width: 8, height: 8, top: '20%', left: '10%', animationDuration: '3s' },
    { width: 5, height: 5, top: '70%', left: '15%', animationDuration: '4s' },
    { width: 12, height: 12, top: '40%', right: '12%', animationDuration: '2.5s' },
    { width: 6, height: 6, top: '80%', right: '20%', animationDuration: '3.5s' },
    { width: 10, height: 10, top: '15%', right: '35%', animationDuration: '5s' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">

        {/* Parallax slider */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.img
              key={current}
              src={heroSlides[current].image}
              {...slideAnim(direction)}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Bellstech hero"
            />
          </AnimatePresence>
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F44]/80 via-[#0A1F44]/55 to-[#0A1F44]/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D6FEB]/25 via-transparent to-transparent z-10" />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} style={{ ...p, position: 'absolute', zIndex: 11 }} />
        ))}

        {/* Animated mesh grid overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.035]"
          style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,1) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />

        {/* Hero content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
          <AnimatePresence mode="wait">
            <motion.div key={current} className="max-w-5xl mx-auto">
              {/* Badge */}
              <motion.div
                {...textAnim(0)}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                Abeokuta's #1 Tech Store
              </motion.div>

              <motion.h1
                {...textAnim(1)}
                className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-tight mb-4"
              >
                {heroSlides[current].headline}{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#1D6FEB]">
                    {heroSlides[current].accent}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#1D6FEB] blur-sm" />
                </span>
                {heroSlides[current].tail && (
                  <><br /><span className="text-white">{heroSlides[current].tail}</span></>
                )}
              </motion.h1>

              <motion.p
                {...textAnim(2)}
                className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-body"
              >
                {heroSlides[current].sub}
              </motion.p>

              <motion.div
                {...textAnim(3)}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Link
                  to="/services"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] text-white px-9 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#1D6FEB]/40 hover:shadow-[#1D6FEB]/60 transition-shadow"
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
          </AnimatePresence>

          {/* Slide controls */}
          <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6 z-30">
            <button onClick={prev} className="bg-white/10 hover:bg-white/25 border border-white/20 text-white p-2.5 rounded-full backdrop-blur-sm transition-all hover:scale-110">
              <FiChevronLeft size={22} />
            </button>
            {/* Dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 h-2.5 bg-[#38BDF8]' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="bg-white/10 hover:bg-white/25 border border-white/20 text-white p-2.5 rounded-full backdrop-blur-sm transition-all hover:scale-110">
              <FiChevronRight size={22} />
            </button>
          </div>

          {/* Progress bar */}
          <motion.div
            key={current}
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-[#F0F6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#1D6FEB] font-semibold text-sm tracking-widest uppercase mb-3">Why Us</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0A1F44] mb-4">Why Choose Bellstech?</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiClock size={28} />, title: 'Fast Repairs', desc: 'Quick turnaround times to get you back online fast.' },
              { icon: <FiShield size={28} />, title: 'Genuine Products', desc: '100% authentic gadgets and replacement parts.' },
              { icon: <FiUsers size={28} />, title: 'Expert Team', desc: 'Highly skilled technicians you can trust.' },
              { icon: <FiAward size={28} />, title: 'Trusted Service', desc: 'Top-rated customer satisfaction in Abeokuta.' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(29,111,235,0.12)' }}
                className="bg-white p-8 rounded-2xl border border-[#1D6FEB]/10 text-center cursor-default transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#1D6FEB]/10 to-[#38BDF8]/10 text-[#1D6FEB] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-[#0A1F44] mb-2">{f.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SNAPSHOT ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-[#1D6FEB] font-semibold text-sm tracking-widest uppercase mb-3">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0A1F44]">Our Services</h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] mt-3 rounded-full" />
            </motion.div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-[#1D6FEB] font-bold hover:text-[#0A1F44] transition-colors">
              View All <FiArrowRight />
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-6 gap-5 snap-x snap-mandatory scrollbar-hide">
            {services.slice(0, 5).map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="min-w-[290px] bg-[#F0F6FF] hover:bg-white p-8 rounded-2xl snap-start flex-shrink-0 border border-[#1D6FEB]/10 hover:border-[#1D6FEB]/30 transition-all shadow-sm hover:shadow-lg cursor-default"
              >
                <h3 className="text-lg font-heading font-bold text-[#0A1F44] mb-3">{s.title}</h3>
                <p className="text-[#64748B] text-sm mb-6 leading-relaxed">{s.description}</p>
                <Link to="/services" className="text-[#1D6FEB] font-bold flex items-center gap-1 text-sm hover:text-[#0A1F44] transition-colors">
                  Learn more <FiArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-[#F0F6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <span className="inline-block text-[#1D6FEB] font-semibold text-sm tracking-widest uppercase mb-3">Our Stock</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0A1F44] mb-4">Featured Products</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.slice(0, 6).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-[#1D6FEB]/08 group"
              >
                <div className="h-52 overflow-hidden bg-gray-50 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-[#0A1F44] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-[#0A1F44] mb-1 line-clamp-1">{p.name}</h3>
                  <p className="text-[#1D6FEB] font-bold mb-4">{p.price}</p>
                  <a
                    href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(p.name)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center bg-[#F0F6FF] hover:bg-gradient-to-r hover:from-[#1D6FEB] hover:to-[#38BDF8] hover:text-white text-[#0A1F44] font-bold py-3 rounded-xl transition-all duration-300 text-sm"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link to="/shop" className="inline-flex items-center gap-2 border-2 border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white px-9 py-4 rounded-full font-bold text-lg transition-all">
              View All Products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1F44] via-[#0d2a5e] to-[#0A1F44]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #1D6FEB 0%, transparent 50%), radial-gradient(circle at 80% 50%, #38BDF8 0%, transparent 50%)' }}
        />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(56,189,248,1) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,1) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-6"
          >
            Need Your Device <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#1D6FEB]">Fixed?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="text-xl text-white/75 mb-12"
          >
            Book a repair appointment today and get your gadget back in perfect shape.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(29,111,235,0.6)' }}
            href="https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20book%20a%20repair%20appointment"
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[#1D6FEB] to-[#38BDF8] text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl transition-shadow"
          >
            Book a Repair Appointment
          </motion.a>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
