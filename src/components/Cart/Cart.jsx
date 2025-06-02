import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = ({ cart, onRemove, onUpdateQuantity, onClearCart }) => {
  const navigate = useNavigate();
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleRemoveItem = (item) => {
    onRemove(item.id);
    toast.info(`Se eliminó ${item.name} del carrito`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    onUpdateQuantity(item.id, newQuantity);
    toast.info(`Cantidad de ${item.name} actualizada a ${newQuantity}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleCheckout = () => {
    toast.success('¡Gracias por tu compra!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    onClearCart();
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <h2>Tu Carrito</h2>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>😢 Tu carrito está vacío</p>
          <button className="continue-shopping" onClick={() => navigate('/productos')}>
            Continuar Comprando
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="quantity-control">
                    <button 
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-item-btn"
                  onClick={() => handleRemoveItem(item)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="cart-actions">
              <button className="checkout-btn" onClick={handleCheckout}>
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 