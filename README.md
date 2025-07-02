# La Tiendita - E-commerce con React y Firestore

Una aplicación de e-commerce moderna construida con React y Firebase Firestore, que permite a los usuarios explorar y comprar productos de diferentes categorías.

## 🚀 Características

- **Catálogo de Productos**: Visualización de productos organizados por categorías (Aperitivos, Cervezas, Gaseosas)
- **Detalles de Productos**: Páginas detalladas con información completa de cada producto
- **Carrito de Compras**: Gestión completa del carrito con persistencia local
- **Base de Datos en Tiempo Real**: Integración con Firebase Firestore
- **Panel de Administración**: Herramientas para gestionar la base de datos
- **Diseño Responsivo**: Interfaz adaptada para dispositivos móviles y desktop
- **Navegación Intuitiva**: Sistema de rutas con React Router

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **Firebase Firestore**: Base de datos en tiempo real
- **React Router**: Navegación entre páginas
- **CSS3**: Estilos personalizados y responsive
- **Vite**: Herramienta de construcción

## 📦 Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd Navega-las-rutas-Gonzalez
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Firestore Database
   - Copia las credenciales de configuración
   - Actualiza el archivo `src/firebase.js` con tus credenciales

4. **Ejecutar la aplicación**:
   ```bash
   npm run dev
   ```

## 🔧 Configuración de Firebase

La aplicación ya incluye una configuración de Firebase. Si necesitas usar tu propio proyecto:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Firestore Database
4. En Configuración del proyecto > General, copia las credenciales
5. Reemplaza la configuración en `src/firebase.js`

## 📊 Estructura de la Base de Datos

### Colección: `products`
```javascript
{
  name: "Nombre del producto",
  price: 450.00,
  category: "aperitivos|cervezas|gaseosa",
  description: "Descripción del producto",
  image: "/img/categoria/01.jpg",
  stock: 25
}
```

### Colección: `orders`
```javascript
{
  buyer: {
    name: "Nombre del cliente",
    email: "email@ejemplo.com",
    phone: "123456789"
  },
  items: [...],
  total: 1500.00,
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Funcionalidades Principales

### Panel de Administración (`/admin`)
- **Poblar Base de Datos**: Agrega productos de ejemplo automáticamente
- **Limpiar Base de Datos**: Elimina todos los productos (con confirmación)
- **Gestión Segura**: Verifica duplicados antes de agregar productos

### Catálogo de Productos
- **Filtrado por Categorías**: Navegación entre aperitivos, cervezas y gaseosas
- **Búsqueda Visual**: Imágenes de alta calidad para cada producto
- **Información Detallada**: Precios, descripciones y stock disponible

### Carrito de Compras
- **Persistencia Local**: Los productos se mantienen al recargar la página
- **Gestión de Cantidades**: Ajuste de cantidades con límites de stock
- **Cálculo Automático**: Total actualizado en tiempo real

## 🎨 Categorías de Productos

### 🍿 Aperitivos
- Papas Fritas Clásicas
- Nachos con Queso
- Maní Salado
- Palitos de Queso

### 🍺 Cervezas
- Cerveza Lager Premium
- Cerveza IPA Artesanal
- Cerveza Stout
- Cerveza Wheat
- Cerveza Pilsner

### 🥤 Gaseosas
- Coca Cola
- Sprite
- Fanta Naranja
- Pepsi
- 7UP

## 🔄 Flujo de Trabajo

1. **Primera Ejecución**: La aplicación detecta automáticamente si la base de datos está vacía y la pobla con productos de ejemplo
2. **Navegación**: Los usuarios pueden explorar productos por categorías o ver todos los productos
3. **Compra**: Agregar productos al carrito y proceder al checkout
4. **Administración**: Usar el panel de admin para gestionar la base de datos

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Layout completo con grid de productos
- **Tablet**: Adaptación de columnas y espaciado
- **Mobile**: Navegación simplificada y cards optimizadas

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno de Firebase
3. Deploy automático en cada push

### Netlify
1. Sube el build a Netlify
2. Configura las variables de entorno
3. Deploy manual o automático

## 🔧 Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
```

## 📝 Notas Importantes

- **Primera Ejecución**: La aplicación poblará automáticamente la base de datos con productos de ejemplo
- **Imágenes**: Las imágenes están en la carpeta `public/img/` y se sirven estáticamente
- **Firestore**: Asegúrate de tener las reglas de seguridad configuradas correctamente
- **CORS**: Configura las reglas de CORS en Firebase si es necesario

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**González** - Desarrollador Full Stack

---

¡Disfruta explorando La Tiendita! 🛒✨
