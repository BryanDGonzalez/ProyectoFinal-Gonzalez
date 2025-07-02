import React, { startTransition } from 'react';
import { BrowserRouter } from 'react-router-dom';

const RouterWrapper = ({ children }) => {
  // Función para manejar transiciones de navegación
  const handleNavigation = (callback) => {
    if (startTransition) {
      startTransition(callback);
    } else {
      callback();
    }
  };

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      {children}
    </BrowserRouter>
  );
};

export default RouterWrapper; 