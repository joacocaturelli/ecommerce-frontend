import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import cartReducer from "./features/cartSlice.js";
import wishlistReducer from "./features/wishlistSlice.js";
import orderReducer from "./features/orderSlice.js";
import toastReducer from "./features/toastSlice.js";
import toastMiddleware from "./middleware/toastMiddleware.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    toast: toastReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(toastMiddleware);
  },
});

// Cómo se accede al estado desde los componentes?
//  state.auth.user    → el usuario logueado (null si no hay)
//  state.cart.count   → el número de items en el carrito

// El nombre de las claves en reducer: {} es el que se usa en useSelector.
// Si cambias 'auth' por 'usuario', tendrás que usar state.usuario.user.

// Así queda el estado de la aplicación
// state = {
//   auth: {
//     user: null // (o los datos del usuario si está logueado)
//   },
//   cart: {
//     count: 0 // (o el número de productos)
//   }
// }
