import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import './Navbar.css';

const Navbar = () => {
  const categories = [
    { id: "aperitivos", name: "Aperitivos" },
    { id: "cervezas", name: "Cervezas" },
    { id: "gaseosa", name: "Gaseosas" }
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">La Tiendita</Link>
      </div>
      
      <div className="nav-categories">
        <Link to="/" className="nav-link">Todos los Productos</Link>
        {categories.map(category => (
          <Link 
            key={category.id}
            to={`/category/${category.id}`}
            className="nav-link"
          >
            {category.name}
          </Link>
        ))}
        <Link to="/admin" className="nav-link admin-link">Admin</Link>
      </div>

      <div className="nav-cart">
        <CartWidget />
      </div>
    </nav>
  );
};

export default Navbar; 