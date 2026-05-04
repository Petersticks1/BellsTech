import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

import logo from '../assets/bellstech-frameArtboard-1.png';

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="Bellstech Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="ml-2 font-heading font-bold text-xl">Bellstech</span>
            </Link>
            <p className="text-brand-muted mb-6">
              Enhancing Your Digital Experience with premium gadget sales, expert repairs, and reliable tech solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/bellstech_" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-highlight transition-colors">
                <FiInstagram size={24} />
              </a>
              <a href="https://wa.me/2348153838529" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-highlight transition-colors">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://tiktok.com/@Bellstech" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-highlight transition-colors">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-brand-muted hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-brand-muted hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/shop" className="text-brand-muted hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-brand-muted hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-brand-muted hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-brand-muted">Gadget Sales</li>
              <li className="text-brand-muted">Phone & Laptop Repairs</li>
              <li className="text-brand-muted">Starlink Installation</li>
              <li className="text-brand-muted">Networking Solutions</li>
              <li className="text-brand-muted">Workspace Setup</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-brand-highlight flex-shrink-0" />
                <span className="text-brand-muted text-sm">KOC Plaza, Before City Computer Village, Behind New SLOT, Opp. FASLINK, Okeilewo, Abeokuta</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-brand-highlight flex-shrink-0" />
                <span className="text-brand-muted text-sm">08153838529</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-brand-highlight flex-shrink-0" />
                <span className="text-brand-muted text-sm">bellstechmulticoncept@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-muted">
          <p>&copy; {new Date().getFullYear()} Bellstech. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Monday – Saturday, 9:00am – 6:00pm</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
