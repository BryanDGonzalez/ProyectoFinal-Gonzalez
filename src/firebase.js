import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

// Configuración de Firebase
// Reemplaza estos valores con los de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtFlpDGLDwPFFHB5bfDDIjt7wQ5_h9ids",
  authDomain: "proyectofinalgonzalez.firebaseapp.com",
  projectId: "proyectofinalgonzalez",
  storageBucket: "proyectofinalgonzalez.firebasestorage.app",
  messagingSenderId: "738626945375",
  appId: "1:738626945375:web:5a0ae5271c5ca73388b6ea",
  measurementId: "G-8NS6FGVS1L"
};


// Inicializar Firebase
let app;
let analytics;
let db;

try {
    console.log('🚀 Inicializando Firebase...');
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase inicializado correctamente');
    
    // Inicializar Analytics solo si está soportado
    isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);
    
    // Inicializar Firestore
    console.log('📊 Inicializando Firestore...');
    db = getFirestore(app);
    console.log('✅ Firestore inicializado correctamente');
    
} catch (error) {
    console.error('❌ Error inicializando Firebase:', error);
    throw new Error(`Error de configuración de Firebase: ${error.message}`);
}

// Verificar que la configuración sea correcta
if (!app || !db) {
    throw new Error('Firebase no se inicializó correctamente');
}

export { db, analytics };
export default app; 