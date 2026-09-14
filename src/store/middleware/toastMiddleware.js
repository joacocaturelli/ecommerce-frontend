import { showError } from "../features/toastSlice";

const toastActions = [
  "auth/logout/rejected",
  "cart/addProduct/rejected",
  "cart/removeProduct/rejected",
  "cart/checkout/rejected",
  "wishlist/addProduct/rejected",
  "wishlist/removeProduct/rejected",
];

const toastMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (!toastActions.includes(action.type)) {
    return result;
  }

  const message = action.payload?.message;

  if (message) {
    store.dispatch(showError(message));
  }

  return result;
};

export default toastMiddleware;
