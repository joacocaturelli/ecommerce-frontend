import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApiError } from "../../utils/apiError";
import * as apiWishlist from "../../api/wishlist";

export const getWishlistThunk = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiWishlist.getWishlist();
      return result;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const addToWishlistThunk = createAsyncThunk(
  "wishlist/addProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await apiWishlist.addToWishlist(productId);

      const wishlist = await apiWishlist.getWishlist();

      return wishlist;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

export const removeFromWishlistThunk = createAsyncThunk(
  "wishlist/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await apiWishlist.removeFromWishlist(productId);

      const wishlist = await apiWishlist.getWishlist();

      return wishlist;
    } catch (error) {
      return rejectWithValue(getApiError(error));
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getWishlist
      .addCase(getWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(getWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addToWishlist
      .addCase(addToWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // removeFromWishlist
      .addCase(removeFromWishlistThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
