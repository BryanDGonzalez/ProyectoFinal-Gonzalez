import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <span className="logo-icon">🍺</span>
      <span className="logo-text">
        <span className="logo-text-main">La Tiendita</span>
        <span className="logo-text-sub">Bebidas</span>
      </span>
    </Link>
  );
};

export default Logo; 