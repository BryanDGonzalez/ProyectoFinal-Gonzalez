import React, { useState } from 'react';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import './Pages.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-container">
      <ItemListContainer greeting="Contacto">
        <div className="contact-container">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <p>📍 Av. Siempreviva 742</p>
            <p>📞 (123) 456-7890</p>
            <p>✉️ contacto@latiendita.com</p>
            <p>⏰ Lunes a Sábado: 9:00 - 20:00</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Envíanos un mensaje</h3>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Enviar Mensaje</button>
          </form>
        </div>
      </ItemListContainer>
    </div>
  );
};

export default Contacto; 