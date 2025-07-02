import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getSubtotal, 
    getTotal 
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
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
    updateQuantity(item.id, newQuantity);
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
    navigate('/checkout');
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
          <button className="continue-shopping" onClick={() => navigate('/')}>
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
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="cart-tax">
              <span>IVA (21%):</span>
              <span>{formatPrice(getSubtotal() * 0.21)}</span>
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <div className="cart-actions">
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceder al Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 