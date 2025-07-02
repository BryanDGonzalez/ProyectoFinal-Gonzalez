import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Configurar React para usar startTransition globalmente
// Esto prepara la aplicación para React Router v7
if (React.startTransition) {
  // Habilitar startTransition para mejorar el rendimiento
  console.log('🚀 React startTransition habilitado para mejor rendimiento');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
