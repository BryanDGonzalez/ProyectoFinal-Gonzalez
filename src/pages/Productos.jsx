import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';
import './Productos.css';

const Productos = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    const filtered = selectedCategory
      ? products.filter(product => product.category === selectedCategory)
      : products;
    setFilteredProducts(filtered);
  }, [selectedCategory]);

  const categories = [
    { id: '', name: 'Todos' },
    { id: 'gaseosa', name: 'Gaseosas' },
    { id: 'cerveza', name: 'Cervezas' },
    { id: 'aperitivo', name: 'Aperitivos' }
  ];

  return (
    <div className="productos-page">
      <h1>Nuestros Productos</h1>
      
      <div className="category-filter">
        {categories.map(category => (
          <a
            key={category.id}
            href={`/productos${category.id ? `?category=${category.id}` : ''}`}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
          >
            {category.name}
          </a>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No se encontraron productos en esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default Productos; 