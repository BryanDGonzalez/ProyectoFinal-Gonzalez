import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        console.log('🛒 Carrito cargado desde localStorage:', parsedCart);
      } catch (error) {
        console.error('❌ Error cargando carrito desde localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      // Calcular total de items
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(total);
      console.log('💾 Carrito guardado en localStorage:', cart);
      console.log('📊 Total de items:', total);
    } catch (error) {
      console.error('❌ Error guardando carrito en localStorage:', error);
    }
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (product, quantity) => {
    console.log('🛒 Intentando agregar al carrito:', { product, quantity });
    
    if (!product || !product.id) {
      console.error('❌ Producto inválido:', product);
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si el producto ya existe, actualizar cantidad
        const updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        console.log('🔄 Producto actualizado en carrito:', updatedCart);
        return updatedCart;
      }
      
      // Si es un producto nuevo, agregarlo
      const newCart = [...prevCart, { ...product, quantity }];
      console.log('➕ Producto agregado al carrito:', newCart);
      return newCart;
    });
  };

  // Remover producto del carrito
  const removeFromCart = (productId) => {
    console.log('🗑️ Removiendo producto del carrito:', productId);
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      console.log('✅ Producto removido del carrito:', newCart);
      return newCart;
    });
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    console.log('📝 Actualizando cantidad:', { productId, newQuantity });
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      console.log('✅ Cantidad actualizada:', updatedCart);
      return updatedCart;
    });
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    console.log('🧹 Limpiando carrito');
    setCart([]);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    const isIn = cart.some(item => item.id === productId);
    console.log('🔍 Verificando si producto está en carrito:', { productId, isIn });
    return isIn;
  };

  // Obtener cantidad de un producto en el carrito
  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    const quantity = item ? item.quantity : 0;
    console.log('📊 Cantidad del producto en carrito:', { productId, quantity });
    return quantity;
  };

  // Calcular subtotal del carrito
  const getSubtotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('💰 Subtotal del carrito:', subtotal);
    return subtotal;
  };

  // Calcular total con impuestos (ejemplo: 21% IVA)
  const getTotal = () => {
    const subtotal = getSubtotal();
    const tax = subtotal * 0.21; // 21% IVA
    const total = subtotal + tax;
    console.log('💵 Total del carrito:', { subtotal, tax, total });
    return total;
  };

  const value = {
    cart,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getSubtotal,
    getTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 