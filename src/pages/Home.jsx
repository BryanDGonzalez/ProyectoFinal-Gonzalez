import React from 'react';
import { Link } from 'react-router-dom';
import { FaWineBottle, FaBeer, FaGlassWhiskey } from 'react-icons/fa';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = ({ onAddToCart }) => {
  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      id: 'gaseosa',
      name: 'Gaseosas',
      icon: <FaWineBottle />,
      description: 'Refrescantes bebidas carbonatadas'
    },
    {
      id: 'cerveza',
      name: 'Cervezas',
      icon: <FaBeer />,
      description: 'Variedad de cervezas artesanales'
    },
    {
      id: 'aperitivo',
      name: 'Aperitivos',
      icon: <FaGlassWhiskey />,
      description: 'Bebidas espirituosas y aperitivos'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a La Tiendita</h1>
          <p className="hero-subtitle">Tu destino para bebidas y aperitivos</p>
          <p className="hero-description">
            Descubre nuestra selección de productos de alta calidad
          </p>
        </div>
      </section>

      <section className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      <section className="categories-preview">
        <h2>Explora Nuestras Categorías</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              to={`/productos?category=${category.id}`} 
              key={category.id}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 