import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiError } from "../../utils/apiError";
import * as apiCart from "../../api/cart";

export const getCartThunk = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    const cart = await apiCart.getCart();

    return cart.items;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const addProductThunk = createAsyncThunk(
  "cart/addProduct",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await apiCart.addProductToCart(productId, quantity);

      const cart = await apiCart.getCart(); // Pedimos el carrito actualizado

      return cart.items;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const removeProductThunk = createAsyncThunk(
  "cart/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await apiCart.removeProductToCart(productId);

      const cart = await apiCart.getCart();

      return cart.items;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const checkoutThunk = createAsyncThunk("cart/checkout", async (_, { rejectWithValue }) => {
  try {
    const result = await apiCart.cartCheckout();

    return result;
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // GetCart
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // AddProduct
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // RemoveProduct
      .addCase(removeProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(removeProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Checkout
      .addCase(checkoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
