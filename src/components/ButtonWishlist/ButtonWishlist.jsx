import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../store/features/wishlistSlice";
import styles from "./ButtonWishlist.module.css";

function ButtonWishlist({ product }) {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.wishlist);

  const isInWish = items.some((item) => item.id === product.id);

  function handleAddToWish() {
    dispatch(addToWishlistThunk(product.id));
  }

  function handleRemoveFromWish() {
    dispatch(removeFromWishlistThunk(product.id));
  }

  return (
    <button
      type="button"
      className={`${styles.toggleFav} ${
        isInWish ? styles.active : ""
      }`}
      onClick={
        isInWish
          ? handleRemoveFromWish
          : handleAddToWish
      }
      aria-label={
        isInWish
          ? "Eliminar de favoritos"
          : "Añadir a favoritos"
      }
      aria-pressed={isInWish}
    >
      <span aria-hidden="true">
        {isInWish ? "♥" : "♡"}
      </span>
    </button>
  );
}

export default ButtonWishlist;