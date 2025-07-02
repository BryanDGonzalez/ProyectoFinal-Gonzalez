import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProducts, getProductsByCategory } from '../../services/firestoreService';
import ProductCard from '../ProductCard/ProductCard';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchProducts = async () => {
      try {
        let productsData;
        if (categoryId) {
          productsData = await getProductsByCategory(categoryId);
        } else {
          productsData = await getProducts();
        }
        setItems(productsData);
      } catch (error) {
        console.error('Error fetching products from Firestore:', error);
        setError('Error al cargar los productos desde Firebase. Por favor, verifica la conexión.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = (product, quantity = 1) => {
    console.log('🛒 Agregando producto desde ItemListContainer:', { product, quantity });
    try {
      addToCart(product, quantity);
      console.log('✅ Producto agregado exitosamente desde ItemListContainer');
    } catch (error) {
      console.error('❌ Error agregando producto desde ItemListContainer:', error);
    }
  };

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

  const getCategoryName = (categoryId) => {
    const categoryNames = {
      'aperitivos': 'Aperitivos',
      'cervezas': 'Cervezas',
      'gaseosa': 'Gaseosas'
    };
    return categoryNames[categoryId] || categoryId;
  };

  return (
    <div className="item-list-container">
      <h2>{categoryId ? `${getCategoryName(categoryId)}` : 'Todos los Productos'}</h2>
      {items.length === 0 ? (
        <div className="no-products">
          <p>No se encontraron productos en esta categoría.</p>
          <p>Verifica que la base de datos de Firebase esté poblada.</p>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer; 