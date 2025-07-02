import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/firestoreService';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cart, getSubtotal, getTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('El carrito está vacío');
      return;
    }

    // Validar formulario
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      // Crear objeto de orden
      const order = {
        buyer: formData,
        items: cart,
        subtotal: getSubtotal(),
        total: getTotal(),
        date: new Date().toISOString(),
        status: 'pending'
      };

      // Crear orden en Firestore
      const orderId = await createOrder(order);

      toast.success(`¡Orden creada exitosamente! ID: ${orderId}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Limpiar carrito
      clearCart();
      
      // Redirigir a página de confirmación
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error('Error al crear la orden:', error);
      toast.error('Error al procesar la orden. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No hay productos en el carrito</h2>
        <button onClick={() => navigate('/')} className="continue-shopping">
          Continuar Comprando
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h3>Información de Contacto</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Dirección de envío *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="3"
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Resumen de la Orden</h3>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: {formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="total-line">
              <span>IVA (21%):</span>
              <span>{formatPrice(getSubtotal() * 0.21)}</span>
            </div>
            <div className="total-line total">
              <span>Total:</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 