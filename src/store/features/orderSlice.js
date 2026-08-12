import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, getOrderById } from "../../api/orders";

export const getOrdersThunk = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrders();
      return orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Error al obtener las ordenes de compra",
      );
    }
  },
);

export const getOrderByIdThunk = createAsyncThunk(
  "order/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const order = await getOrderById(orderId);
      return order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error al obtener la orden de compra");
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // GetOrders
      .addCase(getOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetOrderById
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
