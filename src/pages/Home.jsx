import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWineBottle, FaBeer, FaGlassWhiskey } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/firestoreService';
import ProductCard from '../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts();
        // Tomar los primeros 4 productos como destacados
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    console.log('🛒 Agregando producto desde Home:', { product, quantity });
    try {
      addToCart(product, quantity);
      console.log('✅ Producto agregado exitosamente desde Home');
    } catch (error) {
      console.error('❌ Error agregando producto desde Home:', error);
    }
  };

  const categories = [
    {
      id: 'gaseosa',
      name: 'Gaseosas',
      icon: <FaWineBottle />,
      description: 'Refrescantes bebidas carbonatadas'
    },
    {
      id: 'cervezas',
      name: 'Cervezas',
      icon: <FaBeer />,
      description: 'Variedad de cervezas artesanales'
    },
    {
      id: 'aperitivos',
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
        {loading ? (
          <div className="loading-container">
            <div className="loading">Cargando productos destacados...</div>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No hay productos destacados disponibles.</p>
            <p>Verifica que la base de datos de Firebase esté poblada.</p>
          </div>
        )}
      </section>

      <section className="categories-preview">
        <h2>Explora Nuestras Categorías</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link 
              to={`/categoria/${category.id}`} 
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