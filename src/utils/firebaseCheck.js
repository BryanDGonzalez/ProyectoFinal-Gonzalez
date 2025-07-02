import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const checkFirebaseConnection = async () => {
  const results = {
    firebaseConfig: false,
    firestoreConnection: false,
    permissions: false,
    error: null
  };

  try {
    // Verificar configuración básica
    console.log('🔍 Verificando configuración de Firebase...');
    if (db) {
      results.firebaseConfig = true;
      console.log('✅ Configuración de Firebase OK');
    } else {
      throw new Error('Firebase no está inicializado');
    }

    // Verificar conexión a Firestore
    console.log('🔍 Verificando conexión a Firestore...');
    const testCollection = collection(db, 'test');
    await getDocs(testCollection);
    results.firestoreConnection = true;
    console.log('✅ Conexión a Firestore OK');

    // Verificar permisos
    console.log('🔍 Verificando permisos...');
    const productsCollection = collection(db, 'products');
    await getDocs(productsCollection);
    results.permissions = true;
    console.log('✅ Permisos OK');

  } catch (error) {
    console.error('❌ Error en verificación:', error);
    results.error = error.message;
    
    if (error.code === 'permission-denied') {
      results.error = 'Error de permisos - Verifica las reglas de Firestore';
    } else if (error.code === 'unavailable') {
      results.error = 'Firestore no disponible - Verifica tu conexión';
    } else if (error.code === 'not-found') {
      results.error = 'Proyecto no encontrado - Verifica la configuración';
    }
  }

  return results;
};

export const getFirebaseStatus = () => {
  const status = {
    isConnected: false,
    message: '',
    recommendations: []
  };

  return checkFirebaseConnection()
    .then(results => {
      if (results.firebaseConfig && results.firestoreConnection && results.permissions) {
        status.isConnected = true;
        status.message = 'Firebase conectado correctamente';
      } else {
        status.isConnected = false;
        status.message = results.error || 'Error desconocido';
        
        if (!results.firebaseConfig) {
          status.recommendations.push('Verificar configuración de Firebase');
        }
        if (!results.firestoreConnection) {
          status.recommendations.push('Verificar que Firestore esté habilitado');
        }
        if (!results.permissions) {
          status.recommendations.push('Verificar reglas de seguridad de Firestore');
        }
      }
      
      return status;
    })
    .catch(error => {
      status.isConnected = false;
      status.message = error.message;
      status.recommendations.push('Revisar la consola para más detalles');
      return status;
    });
}; 