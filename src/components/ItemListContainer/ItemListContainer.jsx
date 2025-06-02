import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './ItemListContainer.css';

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with a promise
    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    });

    getProducts
      .then((data) => {
        if (categoryId) {
          const filteredProducts = data.filter(
            (product) => product.category === categoryId
          );
          setItems(filteredProducts);
        } else {
          setItems(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="item-list-container">
      <h2>{categoryId ? `${categoryId} Products` : 'All Products'}</h2>
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer; 