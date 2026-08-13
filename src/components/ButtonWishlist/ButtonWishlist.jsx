import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToWishlistThunk, removeFromWishlistThunk } from "../../store/features/wishlistSlice";
import styles from './ButtonWishlist.module.css'

function ButtonWishlist({product}) {
  const dispatch = useDispatch()
  
  const { items } = useSelector((state) => state.wishlist)

  const isInWish = items.some((item) => item.id === product.id)

  function handleAddToWish() {
    dispatch(addToWishlistThunk(product.id))
  }

  function handleRemoveFromWish() {
    dispatch(removeFromWishlistThunk(product.id))
  }

  return (
    <button 
      className={styles.toggleFav} 
      onClick={
        isInWish
            ? handleRemoveFromWish
            : handleAddToWish
      }
    >
      {isInWish ? '♥' : '♡'}
    </button>
  )
}

export default ButtonWishlist