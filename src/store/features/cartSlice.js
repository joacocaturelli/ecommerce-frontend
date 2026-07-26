import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.count += 1;
    },
    clearCart: (state, action) => {
      state.count = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
