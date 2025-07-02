import { useState } from 'react';
import { populateProducts, clearProducts } from '../../services/firestoreService';
import { useFirebase } from '../../context/FirebaseContext';
import FirebaseDiagnostic from '../FirebaseDiagnostic/FirebaseDiagnostic';
import CartTest from '../CartTest/CartTest';
import CartDiagnostic from '../CartDiagnostic/CartDiagnostic';
import './AdminPanel.css';

const AdminPanel = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [showCartTest, setShowCartTest] = useState(false);
  const [showCartDiagnostic, setShowCartDiagnostic] = useState(false);
  const { forceRecheck } = useFirebase();

  const handlePopulateProducts = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await populateProducts();
      setMessage('✅ Productos agregados exitosamente a Firestore');
    } catch (error) {
      setMessage('❌ Error al agregar productos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearProducts = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar todos los productos? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      await clearProducts();
      setMessage('✅ Productos eliminados exitosamente de Firestore');
    } catch (error) {
      setMessage('❌ Error al eliminar productos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForceRecheck = () => {
    if (window.confirm('¿Estás seguro de que quieres forzar una nueva verificación de Firebase? Esto limpiará el estado guardado y verificará la conexión nuevamente.')) {
      forceRecheck();
    }
  };

  const handleClearCache = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todo el caché de la aplicación? Esto incluye el estado de Firebase y el carrito.')) {
      localStorage.clear();
      sessionStorage.clear();
      setMessage('✅ Caché limpiado exitosamente. La página se recargará.');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <p>Gestiona los productos en la base de datos de Firestore</p>
      
      <div className="admin-actions">
        <button 
          onClick={handlePopulateProducts}
          disabled={loading}
          className="admin-btn populate-btn"
        >
          {loading ? 'Procesando...' : 'Poblar Base de Datos'}
        </button>
        
        <button 
          onClick={handleClearProducts}
          disabled={loading}
          className="admin-btn clear-btn"
        >
          {loading ? 'Procesando...' : 'Limpiar Base de Datos'}
        </button>
        
        <button 
          onClick={() => setShowDiagnostic(!showDiagnostic)}
          className="admin-btn diagnostic-btn"
        >
          {showDiagnostic ? 'Ocultar Diagnóstico' : 'Mostrar Diagnóstico'}
        </button>
        
        <button 
          onClick={() => setShowCartTest(!showCartTest)}
          className="admin-btn cart-test-btn"
        >
          {showCartTest ? 'Ocultar Prueba Carrito' : 'Probar Carrito'}
        </button>
        
        <button 
          onClick={() => setShowCartDiagnostic(!showCartDiagnostic)}
          className="admin-btn cart-diagnostic-btn"
        >
          {showCartDiagnostic ? 'Ocultar Diagnóstico Carrito' : 'Diagnóstico Carrito'}
        </button>
        
        <button 
          onClick={handleForceRecheck}
          className="admin-btn recheck-btn"
        >
          🔄 Forzar Verificación Firebase
        </button>
        
        <button 
          onClick={handleClearCache}
          className="admin-btn cache-btn"
        >
          🗑️ Limpiar Caché
        </button>
      </div>
      
      {message && (
        <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      {showDiagnostic && (
        <div className="diagnostic-section">
          <FirebaseDiagnostic />
        </div>
      )}
      
      {showCartTest && (
        <div className="cart-test-section">
          <CartTest />
        </div>
      )}
      
      {showCartDiagnostic && (
        <div className="cart-diagnostic-section">
          <CartDiagnostic />
        </div>
      )}
      
      <div className="admin-info">
        <h3>Información:</h3>
        <ul>
          <li><strong>Poblar Base de Datos:</strong> Agrega todos los productos de ejemplo a Firestore</li>
          <li><strong>Limpiar Base de Datos:</strong> Elimina todos los productos de Firestore</li>
          <li><strong>Diagnóstico:</strong> Verifica la conexión y estado de Firebase</li>
          <li><strong>Probar Carrito:</strong> Prueba el funcionamiento del carrito sin productos reales</li>
          <li><strong>Diagnóstico Carrito:</strong> Diagnóstico avanzado del sistema del carrito</li>
          <li><strong>Forzar Verificación Firebase:</strong> Limpia el estado guardado y verifica la conexión nuevamente</li>
          <li><strong>Limpiar Caché:</strong> Limpia todo el caché de la aplicación (Firebase + Carrito)</li>
          <li>Los productos incluyen aperitivos, cervezas y gaseosas con imágenes locales</li>
          <li>Esta acción solo debe realizarse una vez para configurar la base de datos</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel; 