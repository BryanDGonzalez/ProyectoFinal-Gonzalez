import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './QuickCartTest.css';

const QuickCartTest = () => {
  const [testResults, setTestResults] = useState([]);
  const { addToCart, removeFromCart, clearCart, cart, totalItems } = useCart();

  const addTestResult = (message, success = true) => {
    setTestResults(prev => [...prev, { message, success, timestamp: new Date() }]);
  };

  const runQuickTest = () => {
    setTestResults([]);
    
    // Test 1: Verificar contexto
    addTestResult('✅ Contexto del carrito disponible', true);
    
    // Test 2: Verificar estado inicial
    addTestResult(`📊 Estado inicial: ${cart.length} items, total: ${totalItems}`, true);
    
    // Test 3: Crear producto de prueba
    const testProduct = {
      id: 'quick-test-' + Date.now(),
      name: 'Producto Rápido',
      price: 100,
      category: 'test',
      description: 'Test rápido',
      image: '/img/logo.png',
      stock: 5
    };
    
    addTestResult(`🧪 Producto de prueba creado: ${testProduct.name}`, true);
    
    // Test 4: Agregar al carrito
    try {
      addToCart(testProduct, 2);
      addTestResult('✅ Producto agregado al carrito', true);
    } catch (error) {
      addTestResult(`❌ Error agregando al carrito: ${error.message}`, false);
    }
    
    // Test 5: Verificar localStorage
    setTimeout(() => {
      try {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productInStorage = savedCart.some(item => item.id === testProduct.id);
        addTestResult(`💾 Producto en localStorage: ${productInStorage}`, productInStorage);
      } catch (error) {
        addTestResult(`❌ Error verificando localStorage: ${error.message}`, false);
      }
      
      // Test 6: Remover del carrito
      try {
        removeFromCart(testProduct.id);
        addTestResult('✅ Producto removido del carrito', true);
      } catch (error) {
        addTestResult(`❌ Error removiendo del carrito: ${error.message}`, false);
      }
      
      // Test 7: Verificar carrito limpio
      setTimeout(() => {
        try {
          const finalCart = JSON.parse(localStorage.getItem('cart') || '[]');
          const productRemoved = !finalCart.some(item => item.id === testProduct.id);
          addTestResult(`🧹 Producto removido de localStorage: ${productRemoved}`, productRemoved);
        } catch (error) {
          addTestResult(`❌ Error verificando limpieza: ${error.message}`, false);
        }
        
        addTestResult('🎉 Prueba rápida completada', true);
      }, 100);
    }, 100);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="quick-cart-test">
      <h4>⚡ Prueba Rápida del Carrito</h4>
      
      <div className="quick-controls">
        <button onClick={runQuickTest} className="quick-test-btn">
          🚀 Ejecutar Prueba Rápida
        </button>
        <button onClick={clearResults} className="clear-results-btn">
          🗑️ Limpiar
        </button>
      </div>
      
      <div className="quick-results">
        {testResults.length === 0 ? (
          <p className="no-quick-results">Haz clic en "Ejecutar Prueba Rápida" para comenzar</p>
        ) : (
          <div className="quick-results-list">
            {testResults.map((result, index) => (
              <div key={index} className={`quick-result ${result.success ? 'success' : 'error'}`}>
                <span className="quick-message">{result.message}</span>
                <span className="quick-time">
                  {result.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="quick-status">
        <p><strong>Estado actual:</strong></p>
        <p>Items en carrito: {cart.length}</p>
        <p>Total de items: {totalItems}</p>
        <p>localStorage disponible: {typeof Storage !== 'undefined' ? '✅ Sí' : '❌ No'}</p>
      </div>
    </div>
  );
};

export default QuickCartTest; 