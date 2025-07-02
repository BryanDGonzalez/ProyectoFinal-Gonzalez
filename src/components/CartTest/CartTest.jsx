import { useCart } from '../../context/CartContext';
import './CartTest.css';

const CartTest = () => {
  const { 
    cart, 
    totalItems, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    getSubtotal, 
    getTotal 
  } = useCart();

  const testProduct = {
    id: 'test-product-1',
    name: 'Producto de Prueba',
    price: 1000,
    category: 'test',
    description: 'Producto para probar el carrito',
    image: '/img/logo.png',
    stock: 10
  };

  const handleAddTestProduct = () => {
    console.log('🧪 Agregando producto de prueba al carrito');
    addToCart(testProduct, 1);
  };

  const handleRemoveTestProduct = () => {
    console.log('🧪 Removiendo producto de prueba del carrito');
    removeFromCart('test-product-1');
  };

  const handleClearCart = () => {
    console.log('🧪 Limpiando carrito');
    clearCart();
  };

  return (
    <div className="cart-test">
      <h3>🧪 Prueba del Carrito</h3>
      
      <div className="test-actions">
        <button onClick={handleAddTestProduct} className="test-btn add-btn">
          ➕ Agregar Producto de Prueba
        </button>
        <button onClick={handleRemoveTestProduct} className="test-btn remove-btn">
          ➖ Remover Producto de Prueba
        </button>
        <button onClick={handleClearCart} className="test-btn clear-btn">
          🗑️ Limpiar Carrito
        </button>
      </div>
      
      <div className="cart-status">
        <h4>Estado del Carrito:</h4>
        <p><strong>Total de items:</strong> {totalItems}</p>
        <p><strong>Subtotal:</strong> ${getSubtotal()}</p>
        <p><strong>Total con IVA:</strong> ${getTotal()}</p>
        <p><strong>Items en carrito:</strong> {cart.length}</p>
      </div>
      
      {cart.length > 0 && (
        <div className="cart-items">
          <h4>Productos en el Carrito:</h4>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span><strong>{item.name}</strong></span>
              <span>Cantidad: {item.quantity}</span>
              <span>Precio: ${item.price}</span>
              <span>ID: {item.id}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="test-info">
        <h4>Información de Depuración:</h4>
        <p>Este componente te permite probar el funcionamiento del carrito sin necesidad de productos reales.</p>
        <p>Revisa la consola del navegador para ver los logs detallados.</p>
      </div>
    </div>
  );
};

export default CartTest; 