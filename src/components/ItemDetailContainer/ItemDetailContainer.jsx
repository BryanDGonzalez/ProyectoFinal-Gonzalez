import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../services/firestoreService';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { id } = useParams();
  const { addToCart, isInCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setAddedToCart(false);
    
    const fetchProduct = async () => {
      try {
        console.log('📡 Obteniendo producto con ID:', id);
        const productData = await getProductById(id);
        console.log('✅ Producto obtenido:', productData);
        setProduct(productData);
      } catch (error) {
        console.error('❌ Error fetching product from Firestore:', error);
        setError('Error al cargar el producto desde Firebase. Por favor, verifica la conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (quantity) => {
    console.log('🛒 handleAddToCart llamado con:', { product, quantity });
    
    if (!product) {
      console.error('❌ No hay producto para agregar al carrito');
      return;
    }

    try {
      addToCart(product, quantity);
      setAddedToCart(true);
      console.log('✅ Producto agregado al carrito exitosamente');
      
      // Mostrar mensaje de éxito temporal
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } catch (error) {
      console.error('❌ Error agregando al carrito:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Cargando detalles del producto desde Firebase...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">
          <h3>❌ Error al cargar producto</h3>
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

  if (!product) {
    return (
      <div className="error-container">
        <div className="error">
          <h3>❌ Producto no encontrado</h3>
          <p>El producto con ID {id} no existe en la base de datos de Firebase.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="retry-btn"
          >
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const productInCart = isInCart(product.id);
  console.log('🔍 Estado del producto en carrito:', { productId: product.id, productInCart, addedToCart });

  return (
    <div className="item-detail-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <p className="stock">
            Stock disponible: {product.stock}
            {product.stock === 0 && <span className="out-of-stock"> - Sin stock</span>}
          </p>
          
          {addedToCart ? (
            <div className="product-added-success">
              <p>✅ ¡Producto agregado al carrito exitosamente!</p>
              <div className="success-actions">
                <button 
                  className="continue-shopping-btn"
                  onClick={() => window.location.href = '/'}
                >
                  🛍️ Seguir Comprando
                </button>
                <button 
                  className="view-cart-btn"
                  onClick={() => window.location.href = '/cart'}
                >
                  🛒 Ver Carrito
                </button>
              </div>
            </div>
          ) : productInCart ? (
            <div className="product-in-cart">
              <p>✅ Producto ya está en el carrito</p>
              <div className="cart-actions">
                <button 
                  className="continue-shopping-btn"
                  onClick={() => window.location.href = '/'}
                >
                  🛍️ Seguir Comprando
                </button>
                <button 
                  className="view-cart-btn"
                  onClick={() => window.location.href = '/cart'}
                >
                  🛒 Ver Carrito
                </button>
              </div>
            </div>
          ) : product.stock > 0 ? (
            <ItemCount 
              stock={product.stock} 
              initial={1} 
              onAdd={handleAddToCart} 
            />
          ) : (
            <div className="out-of-stock-message">
              <p>❌ Producto sin stock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer; 