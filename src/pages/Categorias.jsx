import React from 'react';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';
import './Pages.css';

const Categorias = ({ categories, onCategorySelect }) => {
  return (
    <div className="page-container">
      <ItemListContainer greeting="Nuestras Categorías">
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category} 
              className="category-card"
              onClick={() => onCategorySelect(category)}
            >
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <p>Explora nuestra selección de {category}</p>
            </div>
          ))}
        </div>
      </ItemListContainer>
    </div>
  );
};

export default Categorias; 