import React, { createContext, useContext, useState } from 'react';

const BookingModalContext = createContext();

export const BookingModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState({});

  const openModal = (data = {}) => {
    setInitialData(data);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setInitialData({});
    document.body.style.overflow = 'unset';
  };

  return (
    <BookingModalContext.Provider value={{
      isOpen,
      initialData,
      openModal,
      closeModal
    }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error('useBookingModal must be used within BookingModalProvider');
  }
  return context;
};