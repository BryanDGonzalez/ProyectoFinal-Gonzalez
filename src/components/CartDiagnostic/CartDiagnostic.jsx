import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { getProducts } from '../../services/firestoreService';
import QuickCartTest from '../QuickCartTest/QuickCartTest';
import './CartDiagnostic.css';

const CartDiagnostic = () => {
  const [diagnosticResults, setDiagnosticResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const { addToCart, removeFromCart, clearCart, cart, totalItems } = useCart();

  const addResult = (message, type = 'info') => {
    setDiagnosticResults(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  const runDiagnostic = async () => {
    setIsRunning(true);
    setDiagnosticResults([]);
    
    addResult('🔍 Iniciando diagnóstico del carrito...', 'info');
    
    try {
      // 1. Verificar localStorage
      addResult('📋 Verificando localStorage...', 'info');
      const localStorageAvailable = typeof Storage !== 'undefined';
      addResult(`localStorage disponible: ${localStorageAvailable}`, localStorageAvailable ? 'success' : 'error');
      
      if (localStorageAvailable) {
        const savedCart = localStorage.getItem('cart');
        addResult(`Carrito guardado en localStorage: ${savedCart ? 'Sí' : 'No'}`, savedCart ? 'success' : 'warning');
      }
      
      // 2. Verificar contexto del carrito
      addResult('🛒 Verificando contexto del carrito...', 'info');
      addResult(`Estado actual del carrito: ${cart.length} items`, 'info');
      addResult(`Total de items: ${totalItems}`, 'info');
      
      // 3. Probar funciones del carrito
      addResult('🧪 Probando funciones del carrito...', 'info');
      
      // Crear producto de prueba
      const testProduct = {
        id: 'test-diagnostic-' + Date.now(),
        name: 'Producto de Diagnóstico',
        price: 100,
        category: 'test',
        description: 'Producto para pruebas',
        image: '/img/logo.png',
        stock: 10
      };
      
      addResult(`Producto de prueba creado: ${testProduct.name}`, 'info');
      
      // Probar agregar al carrito
      try {
        addToCart(testProduct, 1);
        addResult('✅ Función addToCart ejecutada correctamente', 'success');
      } catch (error) {
        addResult(`❌ Error en addToCart: ${error.message}`, 'error');
      }
      
      // Verificar si se agregó
      setTimeout(() => {
        const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const productAdded = updatedCart.some(item => item.id === testProduct.id);
        addResult(`Producto agregado al carrito: ${productAdded}`, productAdded ? 'success' : 'error');
        
        // Probar remover del carrito
        try {
          removeFromCart(testProduct.id);
          addResult('✅ Función removeFromCart ejecutada correctamente', 'success');
        } catch (error) {
          addResult(`❌ Error en removeFromCart: ${error.message}`, 'error');
        }
        
        // Verificar si se removió
        setTimeout(() => {
          const finalCart = JSON.parse(localStorage.getItem('cart') || '[]');
          const productRemoved = !finalCart.some(item => item.id === testProduct.id);
          addResult(`Producto removido del carrito: ${productRemoved}`, productRemoved ? 'success' : 'error');
          
          // Probar limpiar carrito
          try {
            clearCart();
            addResult('✅ Función clearCart ejecutada correctamente', 'success');
          } catch (error) {
            addResult(`❌ Error en clearCart: ${error.message}`, 'error');
          }
          
          // Verificar carrito limpio
          setTimeout(() => {
            const emptyCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const cartCleared = emptyCart.length === 0;
            addResult(`Carrito limpiado correctamente: ${cartCleared}`, cartCleared ? 'success' : 'error');
            
            addResult('🎉 Diagnóstico del carrito completado', 'success');
            setIsRunning(false);
          }, 500);
        }, 500);
      }, 500);
      
    } catch (error) {
      addResult(`❌ Error durante el diagnóstico: ${error.message}`, 'error');
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setDiagnosticResults([]);
  };

  const exportResults = () => {
    const resultsText = diagnosticResults
      .map(result => `[${result.timestamp}] ${result.message}`)
      .join('\n');
    
    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cart-diagnostic-results.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cart-diagnostic">
      <h3>🔍 Diagnóstico del Carrito</h3>
      
      {/* Prueba Rápida */}
      <QuickCartTest />
      
      <div className="diagnostic-controls">
        <button 
          onClick={runDiagnostic} 
          disabled={isRunning}
          className="diagnostic-btn run-btn"
        >
          {isRunning ? '🔄 Ejecutando...' : '🚀 Ejecutar Diagnóstico Completo'}
        </button>
        
        <button 
          onClick={clearResults}
          className="diagnostic-btn clear-btn"
        >
          🗑️ Limpiar Resultados
        </button>
        
        <button 
          onClick={exportResults}
          disabled={diagnosticResults.length === 0}
          className="diagnostic-btn export-btn"
        >
          📄 Exportar Resultados
        </button>
      </div>
      
      <div className="diagnostic-results">
        <h4>Resultados del Diagnóstico Completo:</h4>
        
        {diagnosticResults.length === 0 ? (
          <p className="no-results">No hay resultados. Ejecuta el diagnóstico completo para comenzar.</p>
        ) : (
          <div className="results-list">
            {diagnosticResults.map((result, index) => (
              <div key={index} className={`result-item ${result.type}`}>
                <span className="result-message">{result.message}</span>
                <span className="result-time">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="diagnostic-info">
        <h4>Información del Diagnóstico:</h4>
        <ul>
          <li><strong>Prueba Rápida:</strong> Verificación básica del carrito (arriba)</li>
          <li><strong>Diagnóstico Completo:</strong> Pruebas detalladas con logs</li>
          <li><strong>localStorage:</strong> Verifica si el almacenamiento local está disponible</li>
          <li><strong>Contexto del Carrito:</strong> Prueba las funciones básicas del carrito</li>
          <li><strong>Funciones:</strong> Verifica addToCart, removeFromCart y clearCart</li>
          <li><strong>Persistencia:</strong> Confirma que los datos se guarden correctamente</li>
        </ul>
      </div>
    </div>
  );
};

export default CartDiagnostic; 