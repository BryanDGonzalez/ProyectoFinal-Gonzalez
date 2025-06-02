import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './Navbar.css';

const Navbar = ({ cartItems }) => {
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">My Store</Link>
      </div>
      
      <div className="nav-categories">
        <Link to="/" className="nav-link">All Products</Link>
        {categories.map(category => (
          <Link 
            key={category.id}
            to={`/category/${category.id}`}
            className="nav-link"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="nav-cart">
        <Link to="/cart" className="cart-link">
          Cart ({cartItemsCount})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 