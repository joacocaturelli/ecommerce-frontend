// Elementos Principales de un Slice:
// -  initialState: El valor por defecto o estado inicial para esa porción específica de datos.
// -  Reducers: Las funciones lógicas que dictan cómo debe cambiar el estado en respuesta a una acción determinada.
// -  Actions: Los eventos o disparadores que ejecutan los reducers.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/auth";

export const registerThunk = createAsyncThunk("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const user = await registerUser(credentials);
    return user; // el return es el payload
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Error al hacer el registro");
  }
});

export const loginThunk = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const data = await loginUser(credentials);
    localStorage.setItem("token", data.token); // guardamos el token en localStore
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Error al iniciar sesion");
  }
});

const authSlice = createSlice({
  name: "auth", // nombre para verlo en las herramientas de desarrollo
  initialState: {
    user: null, // empezamos sin user logeado
    token: localStorage.getItem("token") ?? null,
    loading: false,
    error: null,
  },
  reducers: {
    // Para funciones Sincronas
    // Función para iniciar sesión o actualizar los datos del usuario.
    // - state: Es el estado actual (en este caso, { user: null }).
    // - action: Es el objeto que describe lo que pasó.
    //    Lleva una propiedad llamada payload (la carga útil), que contiene los datos del usuario que se acaba de loguear.
    logoutUser: (state, action) => {
      state.user = null; // cerrar sesion
      state.token = null; // eliminamos el token del estado
      localStorage.removeItem("token"); // eliminamos el token del localStorage
    },
  },
  extraReducers: (builder) => {
    // Para funciones Asincronas

    // Estructura de extraReducers
    // pending   → la petición está en vuelo  → loading: true
    // fulfilled → éxito  → guardar datos (user, token)
    // rejected  → error  → guardar el mensaje de error

    // action.payload en fulfilled = el valor devuelto por el thunk (registerThunk, loginThunk) (return data)
    // action.payload en rejected  = el valor de rejectWithValue (message)

    // registerThunk
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loginThunk
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
