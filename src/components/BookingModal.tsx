import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'repair' | 'consultation';
}

const BookingModal = ({ isOpen, onClose, initialType = 'repair' }: BookingModalProps) => {
  const [bookingType, setBookingType] = useState<'repair' | 'consultation'>(initialType);
  const [bookingData, setBookingData] = useState({ name: '', email: '', fault: '' });

  useEffect(() => {
    if (isOpen) {
      setBookingType(initialType);
      // Optional: Clear form data on open
      // setBookingData({ name: '', email: '', fault: '' });
    }
  }, [isOpen, initialType]);


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/[0.02] backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#0D1B33] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-white">
                  {bookingType === 'repair' ? 'Book Repair' : 'Book Consultation'}
                </h3>
                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                  <FiX size={24} />
                </button>
              </div>

              {/* Toggle Bar */}
              <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
                <button
                  onClick={() => setBookingType('repair')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    bookingType === 'repair' 
                    ? 'bg-[#1D6FEB] text-white shadow-lg' 
                    : 'text-white/40 hover:text-white'
                  }`}
                >
                  Book Repair
                </button>
                <button
                  onClick={() => setBookingType('consultation')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    bookingType === 'consultation' 
                    ? 'bg-[#1D6FEB] text-white shadow-lg' 
                    : 'text-white/40 hover:text-white'
                  }`}
                >
                  Book Consultation
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1D6FEB] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1D6FEB] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-2">
                    {bookingType === 'repair' ? 'Fault Description' : 'What do you want to consult?'}
                  </label>
                  <textarea
                    value={bookingData.fault}
                    onChange={(e) => setBookingData({ ...bookingData, fault: e.target.value })}
                    placeholder={bookingType === 'repair' ? "What's wrong with your device?" : "Describe what you'd like to discuss..."}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1D6FEB] transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                  <p className="text-sm font-bold text-white/70 mb-4">Choose Booking Channel:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href={`https://wa.me/2348153838529?text=Hi%20Bellstech%2C%20I%20would%20like%20to%20book%20a%20${bookingType}.%0A%0A*Name:*%20${encodeURIComponent(bookingData.name)}${bookingData.email ? `%0A*Email:*%20${encodeURIComponent(bookingData.email)}` : ''}%0A*${bookingType === 'repair' ? 'Fault' : 'Consultation'}:*%20${encodeURIComponent(bookingData.fault)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:bellstechmulticoncept@gmail.com?subject=${bookingType === 'repair' ? 'Repair' : 'Consultation'} Booking - ${bookingData.name}&body=Name: ${bookingData.name}%0AEmail: ${bookingData.email || 'Not provided'}%0A${bookingType === 'repair' ? 'Fault' : 'Consultation Request'}: ${bookingData.fault}`}
                      className="flex items-center justify-center gap-2 bg-[#1D6FEB] text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-white/40 text-sm">
                  Prefer calling? <a href="tel:+2348153838529" className="text-[#38BDF8] hover:underline">Direct Contact</a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
