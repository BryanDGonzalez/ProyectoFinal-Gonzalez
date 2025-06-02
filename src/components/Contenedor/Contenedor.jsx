import React from 'react';
import './Contenedor.css';

const Contenedor = ({ titulo, mensaje, children }) => {
  return (
    <div className="contenedor">
      <div className="contenedor-header">
        <h2>{titulo}</h2>
        <p className="mensaje-bienvenida">{mensaje}</p>
      </div>
      <div className="contenedor-body">
        {children}
      </div>
    </div>
  );
};

export default Contenedor; 