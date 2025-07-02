import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FirebaseProvider, useFirebase } from './context/FirebaseContext';
import RouterWrapper from './components/RouterWrapper/RouterWrapper';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import AdminPanel from './components/AdminPanel/AdminPanel';
import FirebaseQuickCheck from './components/FirebaseQuickCheck/FirebaseQuickCheck';
import './App.css';

function AppContent() {
  const { isInitialized, isLoading, error, forceRecheck } = useFirebase();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <h2>🚀 Inicializando aplicación...</h2>
          <p>Conectando con Firebase Firestore</p>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !isInitialized) {
    return (
      <div className="error-container">
        <div className="error">
          <h2>❌ Error de Inicialización</h2>
          <p>{error || 'No se pudo inicializar Firebase Firestore'}</p>
          
          <FirebaseQuickCheck />
          
          <div className="error-actions">
            <button 
              onClick={forceRecheck}
              className="retry-btn"
            >
              🔄 Forzar Nueva Verificación
            </button>
            <button 
              onClick={() => window.open('/admin', '_blank')}
              className="admin-btn"
            >
              🔧 Ir al Panel de Admin
            </button>
          </div>
          <div className="error-help">
            <h3>💡 Información:</h3>
            <ul>
              <li>La aplicación verifica la conexión solo al cargar la página</li>
              <li>El estado se guarda por 1 hora para evitar verificaciones constantes</li>
              <li>Usa "Forzar Nueva Verificación" si necesitas verificar la conexión</li>
              <li>Verifica que Firestore esté habilitado en Firebase Console</li>
              <li>Revisa las reglas de seguridad de Firestore</li>
              <li>Confirma que la configuración de Firebase sea correcta</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <RouterWrapper>
      <div className="app">
        <ToastContainer />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </RouterWrapper>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </FirebaseProvider>
  );
}

export default App;
