import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './FirebaseQuickCheck.css';

const FirebaseQuickCheck = () => {
  const [status, setStatus] = useState({
    firebaseConfig: 'checking',
    firestoreConnection: 'checking',
    error: null
  });

  useEffect(() => {
    const checkFirebase = async () => {
      try {
        // Verificar configuración básica
        console.log('🔍 Verificando configuración de Firebase...');
        if (!db) {
          throw new Error('Firebase no está inicializado');
        }
        setStatus(prev => ({ ...prev, firebaseConfig: 'success' }));
        console.log('✅ Configuración de Firebase OK');

        // Verificar conexión a Firestore
        console.log('🔍 Verificando conexión a Firestore...');
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        setStatus(prev => ({ ...prev, firestoreConnection: 'success' }));
        console.log('✅ Conexión a Firestore OK');

      } catch (error) {
        console.error('❌ Error en verificación:', error);
        setStatus({
          firebaseConfig: 'error',
          firestoreConnection: 'error',
          error: error.message
        });
      }
    };

    checkFirebase();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'checking': return '⏳';
      default: return '❓';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return 'OK';
      case 'error': return 'Error';
      case 'checking': return 'Verificando...';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="firebase-quick-check">
      <h3>🔧 Verificación Rápida de Firebase</h3>
      
      <div className="check-items">
        <div className={`check-item ${status.firebaseConfig}`}>
          <span className="status-icon">{getStatusIcon(status.firebaseConfig)}</span>
          <div className="check-info">
            <h4>Configuración Firebase</h4>
            <p>{getStatusText(status.firebaseConfig)}</p>
          </div>
        </div>
        
        <div className={`check-item ${status.firestoreConnection}`}>
          <span className="status-icon">{getStatusIcon(status.firestoreConnection)}</span>
          <div className="check-info">
            <h4>Conexión Firestore</h4>
            <p>{getStatusText(status.firestoreConnection)}</p>
          </div>
        </div>
      </div>
      
      {status.error && (
        <div className="check-error">
          <h4>❌ Error Detectado:</h4>
          <p>{status.error}</p>
          <div className="error-suggestions">
            <h5>💡 Soluciones:</h5>
            <ul>
              <li>Verifica que Firestore esté habilitado en Firebase Console</li>
              <li>Revisa las reglas de seguridad de Firestore</li>
              <li>Confirma que la configuración de Firebase sea correcta</li>
              <li>Verifica tu conexión a internet</li>
            </ul>
          </div>
        </div>
      )}
      
      <div className="check-actions">
        <button 
          onClick={() => window.location.reload()}
          className="refresh-btn"
        >
          🔄 Actualizar Verificación
        </button>
        <button 
          onClick={() => window.open('https://console.firebase.google.com/', '_blank')}
          className="console-btn"
        >
          🔧 Abrir Firebase Console
        </button>
      </div>
    </div>
  );
};

export default FirebaseQuickCheck; 