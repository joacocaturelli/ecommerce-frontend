# 🛍️ E-Commerce Frontend

Una **aplicación React moderna y responsive** para un sistema de e-commerce. Construida con **React 19**, **Vite**, **Redux Toolkit** y **React Router v7**, con componentes reutilizables, gestión de estado centralizada y comunicación fluida con el backend.

**URLs de Despliegue:**

- 🔗 Sitio: https://mitienditaonline.netlify.app/
- 🔗 API Backend: https://backend-e-commerce-keoz.onrender.com

---

## ✨ Características Principales

- ✅ **React 19** con React Compiler
- ✅ **Vite 8.1** para bundling ultra-rápido
- ✅ **Redux Toolkit** para gestión de estado centralizada
- ✅ **React Router v7** con rutas protegidas
- ✅ **22+ Componentes** reutilizables y modularizados
- ✅ **15 Páginas** para e-commerce completo
- ✅ **CSS Modules** para estilos aislados
- ✅ **Design System** con variables CSS y temas (light/dark)
- ✅ **Axios** para HTTP con interceptores
- ✅ **Responsive Design** (mobile-first)
- ✅ **Toast Notifications** para feedback del usuario
- ✅ **Error Handling** centralizado

---

## 📊 Estructura del Proyecto

```
frontendReact/
│
├── src/
│   │
│   ├── api/                         # Llamadas HTTP al backend
│   │   ├── axios.js                 # Cliente Axios con interceptores
│   │   ├── auth.js                  # Endpoints de autenticación
│   │   ├── products.js              # Endpoints de productos
│   │   ├── cart.js                  # Endpoints de carrito
│   │   ├── orders.js                # Endpoints de órdenes
│   │   ├── reviews.js               # Endpoints de reseñas
│   │   └── wishlist.js              # Endpoints de wishlist
│   │
│   ├── components/                  # Componentes reutilizables
│   │   │
│   │   ├── Button/                  # Botón genérico
│   │   ├── ButtonBack/              # Botón atrás
│   │   ├── ButtonWishlist/          # Botón favoritos
│   │   ├── Header/                  # Encabezado + navegación
│   │   ├── Footer/                  # Pie de página
│   │   ├── Layout/                  # Layout principal (Header + página + Footer)
│   │   │
│   │   ├── ProductCard/             # Card básico para producto
│   │   ├── ProductCardCart/         # Card para carrito
│   │   ├── ProductCardWish/         # Card para wishlist
│   │   ├── ProductCardAdmin/        # Card para admin (con acciones)
│   │   ├── ProductGrid/             # Grilla de productos
│   │   ├── ProductList/             # Lista de productos
│   │   ├── ProductForm/             # Formulario de producto [ADMIN]
│   │   │
│   │   ├── ReviewForm/              # Formulario para crear reseña
│   │   ├── ReviewList/              # Lista de reseñas
│   │   ├── StarRating/              # Componente de rating (1-5)
│   │   │
│   │   ├── OrderCard/               # Card de orden
│   │   ├── OrderList/               # Lista de órdenes
│   │   ├── OrderCardList/           # Versión alternativa de card
│   │   │
│   │   ├── StatusMessage/           # Mensajes de estado (éxito/error)
│   │   ├── Toast/                   # Notificación temporal
│   │   └── PrivateRoute/            # Protección de rutas [AUTH]
│   │
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useProducts.js           # Hook para listado de productos
│   │   ├── useProduct.js            # Hook para producto individual
│   │   └── useReviews.js            # Hook para reseñas
│   │
│   ├── pages/                       # Páginas de la aplicación
│   │   │
│   │   ├── HomePage/                # Home - Landing page
│   │   ├── ProductsPage/            # Listado de productos
│   │   ├── ProductsDetailPage/      # Detalle de producto + reviews
│   │   │
│   │   ├── LoginPage/               # Iniciar sesión
│   │   ├── RegisterPage/            # Registrarse
│   │   ├── ProfilePage/             # Perfil de usuario [AUTH]
│   │   │
│   │   ├── CartPage/                # Carrito de compras [AUTH]
│   │   ├── WishlistPage/            # Lista de favoritos [AUTH]
│   │   │
│   │   ├── AllOrdersPage/           # Historial de órdenes [AUTH]
│   │   ├── OrderPage/               # Detalle de orden [AUTH]
│   │   ├── OrderSuccessPage/        # Confirmación de compra [AUTH]
│   │   │
│   │   ├── AdminPage/               # Dashboard admin [ADMIN]
│   │   ├── AdminProductPage/        # Gestión de productos [ADMIN]
│   │   ├── AdminProductFormPage/    # Formulario de producto [ADMIN]
│   │   │
│   │   └── NotFoundPage/            # Página 404
│   │
│   ├── router/
│   │   └── Router.jsx               # Configuración de rutas (React Router v7)
│   │
│   ├── store/                       # Redux Toolkit
│   │   ├── store.js                 # Configuración de Redux
│   │   ├── features/                # Slices (reductores)
│   │   │   ├── authSlice.js         # Estado de autenticación
│   │   │   ├── cartSlice.js         # Estado del carrito
│   │   │   ├── wishlistSlice.js     # Estado de favoritos
│   │   │   ├── orderSlice.js        # Estado de órdenes
│   │   │   └── toastSlice.js        # Estado de notificaciones
│   │   └── middleware/
│   │       └── toastMiddleware.js   # Middleware para auto-limpiar toasts
│   │
│   ├── styles/
│   │   └── globals.css              # Estilos globales + design tokens
│   │
│   ├── utils/                       # Funciones auxiliares
│   │
│   ├── App.jsx                      # Componente raíz
│   └── main.jsx                     # Punto de entrada
│
├── index.html                       # HTML principal
├── .env.example                     # Variables de entorno de ejemplo
├── .gitignore
├── vite.config.js                   # Configuración de Vite
├── eslint.config.js                 # Configuración de ESLint
├── package.json
├── package-lock.json
└── README.md
```

---

## 🎨 Componentes

### Componentes Base (Reutilizables)

| Componente         | Ubicación                    | Usos          | Props                                    |
| ------------------ | ---------------------------- | ------------- | ---------------------------------------- |
| **Button**         | `/components/Button`         | 20+           | `text`, `onClick`, `disabled`, `variant` |
| **ButtonBack**     | `/components/ButtonBack`     | 7 páginas     | `onClick`                                |
| **ButtonWishlist** | `/components/ButtonWishlist` | ProductCard\* | `productId`, `isFav`                     |
| **StatusMessage**  | `/components/StatusMessage`  | 15+           | `type` (success/error), `message`        |
| **Toast**          | `/components/Toast`          | Global        | Redux dispatch                           |

### Componentes de Productos

| Componente           | Propósito                                 | Padre                          |
| -------------------- | ----------------------------------------- | ------------------------------ |
| **ProductCard**      | Card básico con imagen/precio/botón       | ProductsPage, ProductGrid      |
| **ProductCardCart**  | Card con cantidad y precio total          | CartPage, ProductList          |
| **ProductCardWish**  | Card con opción remover                   | WishlistPage, ProductList      |
| **ProductCardAdmin** | Card con botones editar/eliminar          | AdminProductPage, ProductGrid  |
| **ProductGrid**      | Grilla responsiva (renderiza ProductCard) | ProductsPage, AdminProductPage |
| **ProductList**      | Lista vertical (renderiza ProductCard\*)  | CartPage, WishlistPage         |
| **ProductForm**      | Formulario para crear/editar              | AdminProductFormPage           |

### Componentes de Órdenes

| Componente        | Propósito                          |
| ----------------- | ---------------------------------- |
| **OrderCard**     | Card de orden individual           |
| **OrderList**     | Lista de órdenes del usuario       |
| **OrderCardList** | Variante alternativa del OrderCard |

### Componentes de Reseñas

| Componente     | Propósito                            |
| -------------- | ------------------------------------ |
| **ReviewForm** | Formulario para crear/editar reseña  |
| **ReviewList** | Lista de reseñas de un producto      |
| **StarRating** | Componente de rating (1-5 estrellas) |

### Componentes Estructurales

| Componente       | Propósito                                             |
| ---------------- | ----------------------------------------------------- |
| **Layout**       | Envuelve todas las páginas (Header + Outlet + Footer) |
| **Header**       | Navegación + links + autenticación                    |
| **Footer**       | Pie de página                                         |
| **PrivateRoute** | Protege rutas que requieren autenticación             |

---

## 📄 Páginas

### Públicas (No requieren autenticación)

- **HomePage** - Landing page con links
- **ProductsPage** - Listado de todos los productos
- **ProductDetailPage** - Detalle de producto + reviews + formulario de reseña
- **LoginPage** - Formulario de login
- **RegisterPage** - Formulario de registro
- **NotFoundPage** - Página 404

### Privadas (Requieren autenticación)

- **ProfilePage** - Perfil del usuario autenticado
- **CartPage** - Carrito de compras con total
- **WishlistPage** - Lista de favoritos
- **AllOrdersPage** - Historial de todas las órdenes
- **OrderPage** - Detalle de orden específica
- **OrderSuccessPage** - Confirmación después de compra

### Admin (Requieren role ADMIN)

- **AdminPage** - Dashboard de administración
- **AdminProductPage** - Gestión de productos (CRUD)
- **AdminProductFormPage** - Formulario para crear/editar producto

---

## 🔄 Flujo de Datos (Redux)

### Estado Global

```javascript
{
  auth: {
    user: null | { id, email, name, role },
    loading: false,
    error: null
  },
  cart: {
    count: 0,
    items: [],
    loading: false
  },
  wishlist: {
    items: [],
    loading: false
  },
  order: {
    current: null,
    loading: false
  },
  toast: {
    message: '',
    type: 'success' | 'error' | 'info',
    show: false
  }
}
```

### Slices (Reductores)

#### authSlice.js

```javascript
// Actions
-setAuth(user) - // Guarda usuario autenticado
  clearAuth() - // Limpia autenticación (logout)
  setLoading(boolean) - // Carga
  setError(string); // Errores
```

#### cartSlice.js

```javascript
// Actions
-addItem(product) - // Añade producto al carrito
  removeItem(productId) - // Remueve producto
  updateCount(delta) - // Actualiza cantidad
  clearCart(); // Vacía carrito
```

#### wishlistSlice.js

```javascript
// Actions
-toggleWishlist(productId) - setWishlist(items);
```

#### orderSlice.js

```javascript
// Actions
-setCurrentOrder(order) - clearCurrentOrder();
```

#### toastSlice.js

```javascript
// Actions
-showToast({ message, type }) - hideToast();
```

### Middleware

#### toastMiddleware.js

- Auto-limpia notificaciones después de 3 segundos
- Dispara `hideToast()` automáticamente

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- Backend corriendo en `VITE_API_URL`

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/joacocaturelli/frontend-react.git
   cd frontendReact
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.example .env
   # Editar .env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Iniciar servidor de desarrollo**

   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:5173`

---

## 📦 Dependencias Principales

### Core

- **React 19.2.7** - Library de UI
- **React DOM 19.2.7** - Renderizado en DOM
- **React Router DOM 7.18.1** - Enrutamiento

### State Management

- **@reduxjs/toolkit 2.12.0** - Redux simplificado
- **react-redux 9.3.0** - Conectar Redux con React

### HTTP Client

- **Axios 1.18.1** - Cliente HTTP con interceptores

### Fonts

- **@fontsource/inter 5.2.8** - Font Inter
- **@fontsource/manrope 5.2.8** - Font Manrope

### Build & Dev

- **Vite 8.1.1** - Build tool ultra-rápido
- **@vitejs/plugin-react 6.0.3** - Plugin React para Vite
- **Babel** - Transpilación con React Compiler

### Linting

- **ESLint 10.6.0** - Linter de JavaScript
- **eslint-plugin-react-refresh** - Plugin para optimizaciones
- **eslint-plugin-react-hooks** - Plugin para hooks

---

## 📝 Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```bash
# API Backend
VITE_API_URL=http://localhost:3000/api

# Para producción
# VITE_API_URL=https://backend-e-commerce-keoz.onrender.com/api
```

---

## 🎨 Design System

### Colores (CSS Variables)

```css
/* Palette */
--night-bordeaux: #66101f --lemon-chiffon: #f4f0bb --sea-green: #5b8c5a --prussian-blue: #011936
  --graphite: #2b2c28 /* Semantic */ --color-primary: var(--night-bordeaux)
  --color-secondary: var(--sea-green) --color-success: var(--sea-green) --color-warning: #b58b00
  --color-danger: var(--night-bordeaux);
```

### Tipografía

```css
--font-xs: 0.75rem --font-sm: 0.875rem --font-md: 1rem --font-lg: 1.25rem --font-xl: 1.5rem
  --font-2xl: 2rem --font-3xl: 3rem;
```

### Espaciado

```css
--space-xs: 0.25rem --space-sm: 0.5rem --space-md: 1rem --space-lg: 1.5rem --space-xl: 2rem
  --space-2xl: 3rem;
```

### Temas

- **Light Theme** (por defecto) - Fondo claro, texto oscuro
- **Dark Theme** - Fondo oscuro, texto claro (`data-theme="dark"`)

### Breakpoints

```css
--bp-tablet: 768px --bp-desktop: 1024px;
```

---

## 🌈 Componentes de Estilo CSS Modules

Cada componente tiene su archivo `.module.css`:

```javascript
// Button.jsx
import styles from "./Button.module.css";

export default function Button({ text, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}
```

```css
/* Button.module.css */
.button {
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-primary);
  color: var(--color-text-light);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

---

## 🔐 Autenticación

### Flujo de Login

1. Usuario llena formulario en `LoginPage`
2. Axios POST a `/api/auth/login` (con credenciales)
3. Backend retorna usuario y guarda JWT en cookie HTTP-only
4. Middleware `authSlice` guarda usuario en Redux
5. `PrivateRoute` permite acceso a páginas protegidas

### Flujo de Logout

1. Usuario clica botón logout
2. Axios POST a `/api/auth/logout`
3. Backend limpia cookie
4. `clearAuth()` limpia estado de Redux
5. Usuario redirige a login

### Protección de Rutas

```javascript
// PrivateRoute.jsx
export default function PrivateRoute({ children, requiredRole }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;

  return children;
}
```

---

## 📡 Comunicación con Backend

### Axios Interceptor

```javascript
// api/axios.js
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth()); // Auto-logout
    }
    return Promise.reject(error);
  },
);
```

### Ejemplo de Llamada API

```javascript
// api/products.js
export const fetchProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data.data;
};

// En componente
const [products, setProducts] = useState([]);
useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

---

## 🎯 Custom Hooks

### useProducts()

```javascript
const { products, loading, error } = useProducts();
```

### useProduct(productId)

```javascript
const { product, loading, error } = useProduct(productId);
```

### useReviews(productId)

```javascript
const { reviews, loading, error } = useReviews(productId);
```

---

## 📱 Responsive Design

### Estrategia Mobile-First

```css
/* Mobile por defecto */
.container {
  padding: var(--space-md);
  grid-template-columns: 1fr;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: var(--space-lg);
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Clamp para Tipografía Fluida

```css
font-size: clamp(1rem, 2vw, 2rem);
```

---

## 📚 Rutas de la Aplicación

### Public Routes

```
GET  /                     → HomePage
GET  /products             → ProductsPage
GET  /products/:productId  → ProductDetailPage
GET  /login                → LoginPage
GET  /register             → RegisterPage
GET  *                     → NotFoundPage
```

### Private Routes (Requieren Auth)

```
GET  /profile              → ProfilePage
GET  /cart                 → CartPage
GET  /wishlist             → WishlistPage
GET  /orders               → AllOrdersPage
GET  /order/:orderId       → OrderPage
GET  /order/:orderId/success → OrderSuccessPage
```

### Admin Routes (Requieren ADMIN)

```
GET  /admin                → AdminPage
GET  /admin/products       → AdminProductPage
GET  /admin/products/form  → AdminProductFormPage (create)
GET  /admin/products/form/:productId → AdminProductFormPage (edit)
```

---

## 🔄 Integración con Backend

### Headers Automáticos

```javascript
apiClient.defaults.headers.common["Content-Type"] = "application/json";
// Credentials enviadas automáticamente (cookies)
```

### Formato de Respuesta

**Éxito (200, 201):**

```json
{
  "ok": true,
  "data": {
    /* objeto o array */
  }
}
```

**Error (4xx, 5xx):**

```json
{
  "ok": false,
  "error": "Descripción del error"
}
```

---

## 🚀 Despliegue

### Netlify

1. Push a GitHub
2. Conectar en Netlify
3. Configurar variables de entorno en Netlify
4. Deploy automático en push a main

```bash
npm run build
# Deployar carpeta /dist
```

### Render

```bash
npm run build
npm run preview
```

---

## 🐛 Troubleshooting

### Error: "VITE_API_URL no definido"

```bash
# Verificar .env está en raíz del proyecto
VITE_API_URL=http://localhost:3000/api
```

### CORS bloqueado

```bash
# Backend debe tener CORS configurado
# Verificar CORS_ORIGINS en backend .env
```

### Redux DevTools

Instalar extensión Chrome "Redux DevTools" para debugging

---

## 📚 Recursos & Referencias

- [React Docs](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router v7](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [Axios Docs](https://axios-http.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

## 👨‍💻 Autor

**Joaquín Caturelli**

- GitHub: [@joacocaturelli](https://github.com/joacocaturelli)
- Portfolio: [Tu sitio]

---

**Última actualización:** Septiembre 2026
