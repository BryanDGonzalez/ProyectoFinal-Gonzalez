import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './FirebaseDiagnostic.css';

const FirebaseDiagnostic = () => {
  const [diagnostic, setDiagnostic] = useState({
    connection: 'checking',
    firestore: 'checking',
    collections: 'checking',
    error: null
  });

  useEffect(() => {
    const runDiagnostic = async () => {
      try {
        console.log('🔍 Iniciando diagnóstico de Firebase...');
        
        // Verificar conexión básica
        setDiagnostic(prev => ({ ...prev, connection: 'checking' }));
        await getDocs(collection(db, 'test'));
        setDiagnostic(prev => ({ ...prev, connection: 'success' }));
        console.log('✅ Conexión a Firebase establecida');
        
        // Verificar Firestore
        setDiagnostic(prev => ({ ...prev, firestore: 'checking' }));
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        setDiagnostic(prev => ({ 
          ...prev, 
          firestore: 'success',
          collections: `products: ${productsSnapshot.size} documentos`
        }));
        console.log('✅ Firestore funcionando correctamente');
        
      } catch (error) {
        console.error('❌ Error en diagnóstico:', error);
        setDiagnostic({
          connection: 'error',
          firestore: 'error',
          collections: 'error',
          error: error.message
        });
      }
    };

    runDiagnostic();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'checking':
        return '⏳';
      default:
        return '❓';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Conectado';
      case 'error':
        return 'Error';
      case 'checking':
        return 'Verificando...';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="firebase-diagnostic">
      <h3>🔧 Diagnóstico de Firebase</h3>
      
      <div className="diagnostic-grid">
        <div className={`diagnostic-item ${diagnostic.connection}`}>
          <span className="status-icon">{getStatusIcon(diagnostic.connection)}</span>
          <div className="diagnostic-info">
            <h4>Conexión Firebase</h4>
            <p>{getStatusText(diagnostic.connection)}</p>
          </div>
        </div>
        
        <div className={`diagnostic-item ${diagnostic.firestore}`}>
          <span className="status-icon">{getStatusIcon(diagnostic.firestore)}</span>
          <div className="diagnostic-info">
            <h4>Firestore Database</h4>
            <p>{getStatusText(diagnostic.firestore)}</p>
          </div>
        </div>
        
        <div className={`diagnostic-item ${diagnostic.collections === 'checking' ? 'checking' : 'success'}`}>
          <span className="status-icon">{getStatusIcon(diagnostic.collections === 'checking' ? 'checking' : 'success')}</span>
          <div className="diagnostic-info">
            <h4>Colecciones</h4>
            <p>{diagnostic.collections === 'checking' ? 'Verificando...' : diagnostic.collections}</p>
          </div>
        </div>
      </div>
      
      {diagnostic.error && (
        <div className="diagnostic-error">
          <h4>❌ Error Detectado:</h4>
          <p>{diagnostic.error}</p>
          <div className="diagnostic-suggestions">
            <h5>💡 Sugerencias:</h5>
            <ul>
              <li>Verifica que Firestore esté habilitado en tu proyecto de Firebase</li>
              <li>Revisa las reglas de seguridad de Firestore</li>
              <li>Confirma que la configuración de Firebase sea correcta</li>
              <li>Verifica tu conexión a internet</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="diagnostic-actions">
        <button 
          onClick={() => window.location.reload()}
          className="refresh-btn"
        >
          🔄 Actualizar Diagnóstico
        </button>
      </div>
    </div>
  );
};

export default FirebaseDiagnostic; 