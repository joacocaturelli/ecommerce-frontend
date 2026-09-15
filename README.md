# Full Stack E-commerce — Frontend

Frontend de una aplicación para un sistema de e-commerce desarrollada con **React**, **Vite** y **Redux Toolkit**.

La aplicación permite gestionar productos, usuarios, carrito, wishlist, pedidos, reseñas y pagos mediante una interfaz responsive adaptada a dispositivos móviles y escritorio.

## Demo

**Aplicación desplegada:**

https://mitienditaonline.netlify.app

### Repositorios relacionados

Este repositorio forma parte de una aplicación Full Stack desarrollada conjuntamente con un backend independiente.

- **Backend:** https://github.com/joacocaturelli/ecommerce-api
- **Documentación API:** https://backend-e-commerce-keoz.onrender.com/api/docs

## Funcionalidades

- Registro e inicio de sesión.
- Autenticación y autorización.
- Gestión de productos.
- Búsqueda y visualización de productos.
- Carrito de compra.
- Wishlist.
- Gestión de pedidos.
- Sistema de reseñas.
- Checkout mediante Stripe.
- Panel de administración.
- CRUD de productos para administradores.
- Protección de rutas.
- Notificaciones mediante middleware de Redux.
- Gestión de estados globales con Redux Toolkit.
- Diseño responsive.
- Modo claro y modo oscuro.

## Tecnologías utilizadas

### Frontend

- React
- JavaScript
- Vite
- Redux Toolkit
- React Router
- Axios
- CSS Modules
- HTML5
- CSS3

### Integraciones

- Stripe
- Cloudinary
- API REST desarrollada con Node.js y Express

## Gestión del estado

La aplicación utiliza **Redux Toolkit** para gestionar el estado global.

Entre los principales estados gestionados se encuentran:

- Autenticación.
- Carrito.
- Wishlist.
- Pedidos.
- Notificaciones.

También se utilizan hooks personalizados para encapsular lógica reutilizable y simplificar los componentes.

## Arquitectura de componentes

La aplicación está organizada siguiendo una estructura modular:

```text
src/
├── api/
├── components/
├── hooks/
├── pages/
├── routes/
├── store/
├── styles/
└── main.jsx
```

### Componentes

Los componentes reutilizables incluyen elementos como:

- Botones.
- Formularios.
- Cards de productos.
- Modales.
- Navegación.
- Componentes de autenticación.
- Componentes relacionados con carrito y wishlist.

### Páginas principales

La aplicación incluye diferentes vistas para:

- Inicio.
- Productos.
- Detalle de producto.
- Carrito.
- Wishlist.
- Pedidos.
- Perfil de usuario.
- Autenticación.
- Panel de administración.
- Gestión de productos.

## Autenticación y rutas protegidas

El frontend implementa rutas protegidas para controlar el acceso a determinadas funcionalidades.

Las rutas administrativas requieren permisos de administrador, mientras que las funcionalidades relacionadas con usuarios autenticados requieren una sesión válida.

La autenticación se gestiona mediante el backend utilizando JWT y cookies HTTP-only.

## Responsive Design

La interfaz está desarrollada siguiendo un enfoque responsive para adaptarse a:

- Escritorio.
- Tablets.
- Dispositivos móviles.

Se utilizan **CSS Modules** y técnicas de diseño responsive para mantener una interfaz consistente en diferentes tamaños de pantalla.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/joacocaturelli/ecommerce-frontend.git
cd projectFrontEnd---React
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las variables necesarias para conectar el frontend con el backend.

### 4. Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en la URL indicada por Vite.

### 5. Crear una versión para producción

```bash
npm run build
```

## Arquitectura Full Stack

El frontend se comunica con una API REST desarrollada con Node.js y Express.

```text
┌─────────────────────┐
│       React         │
│      Frontend       │
└──────────┬──────────┘
           │
           │ Axios / HTTP
           ↓
┌─────────────────────┐
│     Node.js +       │
│       Express       │
└──────────┬──────────┘
           │
           ├───────────────┐
           ↓               ↓
┌─────────────────┐  ┌───────────────┐
│ PostgreSQL +    │  │    MongoDB    │
│ Prisma          │  │               │
└─────────────────┘  └───────────────┘

           │
           ├── Stripe
           └── Cloudinary
```

## Estado del proyecto

Proyecto desarrollado como parte de mi formación como **Full Stack Developer**, utilizando React, JavaScript, Node.js, Express, bases de datos SQL y NoSQL e integraciones con servicios externos.

La aplicación se encuentra desplegada y funcional.
