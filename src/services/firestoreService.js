import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  query, 
  where,
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase';

// Colecciones
const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';

// Productos de ejemplo para poblar la base de datos
const sampleProducts = [
  // Aperitivos
  {
    name: "Papas Fritas Clásicas",
    price: 450.00,
    category: "aperitivos",
    description: "Papas fritas crujientes y doradas, perfectas para acompañar cualquier bebida",
    image: "/img/aperitivos/01.jpg",
    stock: 25
  },
  {
    name: "Nachos con Queso",
    price: 380.00,
    category: "aperitivos",
    description: "Nachos crocantes con queso fundido y salsa picante",
    image: "/img/aperitivos/02.jpg",
    stock: 20
  },
  {
    name: "Maní Salado",
    price: 280.00,
    category: "aperitivos",
    description: "Maní tostado y salado, ideal para picar entre amigos",
    image: "/img/aperitivos/03.jpg",
    stock: 30
  },
  {
    name: "Palitos de Queso",
    price: 520.00,
    category: "aperitivos",
    description: "Palitos de queso empanizados, crujientes por fuera y suaves por dentro",
    image: "/img/aperitivos/04.jpg",
    stock: 15
  },
  
  // Cervezas
  {
    name: "Cerveza Lager Premium",
    price: 850.00,
    category: "cervezas",
    description: "Cerveza lager suave y refrescante, perfecta para cualquier ocasión",
    image: "/img/cervezas/01.jpg",
    stock: 50
  },
  {
    name: "Cerveza IPA Artesanal",
    price: 1200.00,
    category: "cervezas",
    description: "Cerveza IPA con notas cítricas y amargas, para los amantes del lúpulo",
    image: "/img/cervezas/02.jpg",
    stock: 30
  },
  {
    name: "Cerveza Stout",
    price: 1100.00,
    category: "cervezas",
    description: "Cerveza stout oscura con notas de café y chocolate",
    image: "/img/cervezas/03.jpg",
    stock: 25
  },
  {
    name: "Cerveza Wheat",
    price: 950.00,
    category: "cervezas",
    description: "Cerveza de trigo suave y refrescante con notas frutales",
    image: "/img/cervezas/04.jpg",
    stock: 35
  },
  {
    name: "Cerveza Pilsner",
    price: 780.00,
    category: "cervezas",
    description: "Cerveza pilsner clásica, ligera y fácil de beber",
    image: "/img/cervezas/05.jpg",
    stock: 40
  },
  
  // Gaseosas
  {
    name: "Coca Cola",
    price: 350.00,
    category: "gaseosa",
    description: "La bebida gaseosa más popular del mundo, refrescante y deliciosa",
    image: "/img/gaseosa/01.jpg",
    stock: 60
  },
  {
    name: "Sprite",
    price: 320.00,
    category: "gaseosa",
    description: "Gaseosa de lima-limón, refrescante y sin cafeína",
    image: "/img/gaseosa/02.jpg",
    stock: 55
  },
  {
    name: "Fanta Naranja",
    price: 330.00,
    category: "gaseosa",
    description: "Gaseosa de naranja con sabor natural y color vibrante",
    image: "/img/gaseosa/03.jpg",
    stock: 45
  },
  {
    name: "Pepsi",
    price: 340.00,
    category: "gaseosa",
    description: "Alternativa refrescante a la cola tradicional",
    image: "/img/gaseosa/04.jpg",
    stock: 50
  },
  {
    name: "7UP",
    price: 310.00,
    category: "gaseosa",
    description: "Gaseosa de lima-limón, clara y refrescante",
    image: "/img/gaseosa/05.jpg",
    stock: 40
  }
];

// Servicios para productos
export const getProducts = async () => {
  try {
    console.log('📡 Obteniendo productos de Firestore...');
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    console.log(`✅ ${products.length} productos obtenidos de Firestore`);
    return products;
  } catch (error) {
    console.error('❌ Error getting products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    console.log(`📡 Obteniendo producto con ID: ${id}`);
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const product = { id: docSnap.id, ...docSnap.data() };
      console.log(`✅ Producto encontrado: ${product.name}`);
      return product;
    } else {
      console.log(`❌ Producto no encontrado con ID: ${id}`);
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.error('❌ Error getting product:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    console.log(`📡 Obteniendo productos de categoría: ${categoryId}`);
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', categoryId)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    console.log(`✅ ${products.length} productos encontrados en categoría ${categoryId}`);
    return products;
  } catch (error) {
    console.error('❌ Error getting products by category:', error);
    throw error;
  }
};

// Servicios para órdenes
export const createOrder = async (orderData) => {
  try {
    console.log('📡 Creando nueva orden...');
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      createdAt: new Date().toISOString()
    });
    console.log(`✅ Orden creada con ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    console.log(`📡 Obteniendo orden con ID: ${orderId}`);
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const order = { id: docSnap.id, ...docSnap.data() };
      console.log(`✅ Orden encontrada: ${order.id}`);
      return order;
    } else {
      console.log(`❌ Orden no encontrada con ID: ${orderId}`);
      throw new Error('Orden no encontrada');
    }
  } catch (error) {
    console.error('❌ Error getting order:', error);
    throw error;
  }
};

// Función para poblar la base de datos con productos de ejemplo
export const populateProducts = async () => {
  try {
    console.log('🚀 Iniciando población de productos...');
    
    // Primero verificamos si ya existen productos
    const existingProducts = await getProducts();
    if (existingProducts.length > 0) {
      console.log('⚠️ La base de datos ya tiene productos. No se agregarán duplicados.');
      return;
    }
    
    console.log(`📦 Agregando ${sampleProducts.length} productos a Firestore...`);
    const batch = writeBatch(db);
    
    // Agregamos todos los productos en un batch
    sampleProducts.forEach((product) => {
      const docRef = doc(collection(db, PRODUCTS_COLLECTION));
      batch.set(docRef, product);
    });
    
    await batch.commit();
    console.log('✅ Productos agregados exitosamente a Firestore');
  } catch (error) {
    console.error('❌ Error populating products:', error);
    throw error;
  }
};

// Función para limpiar la base de datos (útil para desarrollo)
export const clearProducts = async () => {
  try {
    console.log('🗑️ Iniciando limpieza de productos...');
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const batch = writeBatch(db);
    
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`✅ ${querySnapshot.size} productos eliminados de Firestore`);
  } catch (error) {
    console.error('❌ Error clearing products:', error);
    throw error;
  }
}; 