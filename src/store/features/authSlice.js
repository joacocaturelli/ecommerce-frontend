// Elementos Principales de un Slice:
// -  initialState: El valor por defecto o estado inicial para esa porción específica de datos.
// -  Reducers: Las funciones lógicas que dictan cómo debe cambiar el estado en respuesta a una acción determinada.
// -  Actions: Los eventos o disparadores que ejecutan los reducers.

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, getMe, logOut } from "../../api/auth";
import { getApiError } from "../../utils/apiError";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await registerUser(credentials);
      return user; // el return es el payload
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const logOutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const result = await logOut();
    return result;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const getMeThunk = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const result = await getMe();
    return result;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

const authSlice = createSlice({
  name: "auth", // nombre para verlo en las herramientas de desarrollo

  initialState: {
    user: null, // empezamos sin user logeado
    loading: false,
    checkingAuth: true,
    error: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      state.checkingAuth = false;
    },
  },
  extraReducers: (builder) => {
    // Para funciones Asincronas

    // Estructura de extraReducers
    // pending   → la petición está en vuelo  → loading: true
    // fulfilled → éxito  → guardar datos
    // rejected  → error  → guardar el mensaje de error

    // action.payload en fulfilled = el valor devuelto por el thunk (registerThunk, loginThunk) (return data)
    // action.payload en rejected = el objeto devuelto por rejectWithValue
    // { status, message }

    builder
      // registerThunk
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
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
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logOutThunk
      .addCase(logOutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(logOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getMeThunk
      .addCase(getMeThunk.pending, (state) => {
        state.error = null;
        state.checkingAuth = true;
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.checkingAuth = false;
        state.error = null;
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        state.checkingAuth = false;
        state.user = null;

        // Mostramos el error solo si es diferente a 401
        // para no iniciar la app con el error de token no proporcionado
        if (action.payload?.status !== 401) {
          state.error = action.payload;
        }
      });
  },
});

export const { clearAuth } = authSlice.actions;

export const selectIsAdmin = (state) => {
  return state.auth.user?.role === "ADMIN";
};

export default authSlice.reducer;
