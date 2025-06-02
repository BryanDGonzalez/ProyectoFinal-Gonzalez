import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetailContainer.css';

const ItemDetailContainer = ({ onAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with a promise
    const getProduct = new Promise((resolve) => {
      setTimeout(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        resolve(foundProduct);
      }, 1000);
    });

    getProduct
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="item-detail-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <p className="stock">Stock available: {product.stock}</p>
          <ItemCount 
            stock={product.stock} 
            initial={1} 
            onAdd={(quantity) => onAddToCart(product, quantity)} 
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer; 