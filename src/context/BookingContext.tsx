import React, { createContext, useContext, useState, ReactNode } from 'react';
import BookingModal from '../components/BookingModal';

interface BookingContextType {
  openBooking: (type?: 'repair' | 'consultation') => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialType, setInitialType] = useState<'repair' | 'consultation'>('repair');

  const openBooking = (type: 'repair' | 'consultation' = 'repair') => {
    setInitialType(type);
    setIsOpen(true);
  };

  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingModal 
        isOpen={isOpen} 
        onClose={closeBooking} 
        initialType={initialType}
      />
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
