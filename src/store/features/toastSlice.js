import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    showSuccess: (state, action) => {
      state.message = action.payload;
      state.type = "success";
    },
    showError: (state, action) => {
      state.message = action.payload;
      state.type = "error";
    },
    showWarning: (state, action) => {
      state.message = action.payload;
      state.type = "warning";
    },
    showInfo: (state, action) => {
      state.message = action.payload;
      state.type = "info";
    },
    hideToast: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showToast, showSuccess, showError, showWarning, showInfo, hideToast } =
  toastSlice.actions;
export default toastSlice.reducer;
