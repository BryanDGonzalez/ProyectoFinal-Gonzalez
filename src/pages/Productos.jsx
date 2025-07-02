import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard/ProductCard';
import { getProducts, getProductsByCategory } from '../services/firestoreService';
import './Productos.css';

const Productos = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedCategory = searchParams.get('category') || '';
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let productsData;
        if (selectedCategory) {
          productsData = await getProductsByCategory(selectedCategory);
        } else {
          productsData = await getProducts();
        }
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos desde Firebase.');
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product, quantity = 1) => {
    console.log('🛒 Agregando producto desde Productos:', { product, quantity });
    try {
      addToCart(product, quantity);
      console.log('✅ Producto agregado exitosamente desde Productos');
    } catch (error) {
      console.error('❌ Error agregando producto desde Productos:', error);
    }
  };

  const categories = [
    { id: '', name: 'Todos' },
    { id: 'gaseosa', name: 'Gaseosas' },
    { id: 'cervezas', name: 'Cervezas' },
    { id: 'aperitivos', name: 'Aperitivos' }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando productos desde Firebase...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">
          <h3>❌ Error al cargar productos</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

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

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No se encontraron productos en esta categoría.</p>
          <p>Verifica que la base de datos de Firebase esté poblada.</p>
        </div>
      )}
    </div>
  );
};

export default Productos; 