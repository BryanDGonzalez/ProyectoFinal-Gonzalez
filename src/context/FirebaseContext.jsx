import { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, populateProducts } from '../services/firestoreService';

const FirebaseContext = createContext();

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase debe ser usado dentro de un FirebaseProvider');
  }
  return context;
};

export const FirebaseProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Solo inicializar una vez
    if (hasInitialized) {
      return;
    }

    const initializeFirestore = async () => {
      try {
        // Verificar si ya se inicializó en esta sesión
        const sessionInitialized = sessionStorage.getItem('firestoreInitialized');
        const lastCheck = localStorage.getItem('firestoreLastCheck');
        const currentTime = Date.now();
        const oneHour = 60 * 60 * 1000; // 1 hora en milisegundos

        // Si ya se inicializó en esta sesión, no verificar de nuevo
        if (sessionInitialized === 'true') {
          console.log('✅ Firestore ya inicializado en esta sesión');
          setIsInitialized(true);
          setIsLoading(false);
          setHasInitialized(true);
          return;
        }

        // Si la última verificación fue hace menos de 1 hora, usar el estado guardado
        if (lastCheck && (currentTime - parseInt(lastCheck)) < oneHour) {
          const savedState = localStorage.getItem('firestoreState');
          if (savedState) {
            const { isInitialized: savedInitialized, error: savedError } = JSON.parse(savedState);
            console.log('📋 Usando estado guardado de Firestore');
            setIsInitialized(savedInitialized);
            setError(savedError);
            setIsLoading(false);
            
            // Marcar como inicializado en esta sesión
            sessionStorage.setItem('firestoreInitialized', 'true');
            setHasInitialized(true);
            return;
          }
        }

        setIsLoading(true);
        setError(null);
        
        console.log('🔍 Verificando conexión con Firestore...');
        
        // Verificar si ya hay productos en la base de datos
        const existingProducts = await getProducts();
        console.log(`📊 Productos encontrados en Firestore: ${existingProducts.length}`);
        
        if (existingProducts.length === 0) {
          // Si no hay productos, poblar la base de datos
          console.log('🚀 Inicializando base de datos con productos de ejemplo...');
          await populateProducts();
          console.log('✅ Base de datos poblada exitosamente');
        } else {
          console.log('✅ Base de datos ya contiene productos.');
        }
        
        // Guardar estado exitoso
        const successState = { isInitialized: true, error: null };
        localStorage.setItem('firestoreState', JSON.stringify(successState));
        localStorage.setItem('firestoreLastCheck', currentTime.toString());
        sessionStorage.setItem('firestoreInitialized', 'true');
        
        setIsInitialized(true);
      } catch (error) {
        console.error('❌ Error inicializando Firestore:', error);
        
        // Proporcionar mensajes de error más específicos
        let errorMessage = 'Error al conectar con la base de datos.';
        
        if (error.code === 'permission-denied') {
          errorMessage = 'Error de permisos. Verifica las reglas de seguridad de Firestore.';
        } else if (error.code === 'unavailable') {
          errorMessage = 'Firestore no está disponible. Verifica tu conexión a internet.';
        } else if (error.code === 'not-found') {
          errorMessage = 'Proyecto de Firebase no encontrado. Verifica la configuración.';
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`;
        }
        
        // Guardar estado de error
        const errorState = { isInitialized: false, error: errorMessage };
        localStorage.setItem('firestoreState', JSON.stringify(errorState));
        localStorage.setItem('firestoreLastCheck', Date.now().toString());
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        setHasInitialized(true);
      }
    };

    // Agregar un timeout para evitar que se quede colgado
    const timeoutId = setTimeout(() => {
      if (isLoading && !hasInitialized) {
        console.log('⏰ Timeout de inicialización - continuando...');
        setIsLoading(false);
        setIsInitialized(true);
        setError('Timeout en la inicialización de Firestore');
        
        // Guardar estado de timeout
        const timeoutState = { isInitialized: true, error: 'Timeout en la inicialización de Firestore' };
        localStorage.setItem('firestoreState', JSON.stringify(timeoutState));
        localStorage.setItem('firestoreLastCheck', Date.now().toString());
        sessionStorage.setItem('firestoreInitialized', 'true');
        setHasInitialized(true);
      }
    }, 10000); // 10 segundos de timeout

    initializeFirestore();

    return () => clearTimeout(timeoutId);
  }, [hasInitialized]);

  // Función para forzar una nueva verificación (útil para el panel de admin)
  const forceRecheck = () => {
    localStorage.removeItem('firestoreState');
    localStorage.removeItem('firestoreLastCheck');
    sessionStorage.removeItem('firestoreInitialized');
    setHasInitialized(false);
    setIsLoading(true);
    setIsInitialized(false);
    setError(null);
    window.location.reload();
  };

  const value = {
    isInitialized,
    isLoading,
    error,
    forceRecheck
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}; 