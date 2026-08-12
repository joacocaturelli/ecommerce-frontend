import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductThunk, removeProductThunk } from '../../store/features/cartSlice'
import Button from '../Button/Button'
import styles from './ProductCard.module.css'
import { addToWishlistThunk, removeFromWishlistThunk } from '../../store/features/wishlistSlice'

function ProductCard({product, quantity}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.wishlist)

  const productId = product.id

  const isInWish = items.some((item) => item.id === productId)
  
  function handleAddToCart() {
    dispatch(addProductThunk({productId, quantity: 1}))
  }
  
  function handleRemoveToCart() {
    dispatch(removeProductThunk(productId))
  }

  function handleAddToWish() {
    dispatch(addToWishlistThunk(productId))
  }

  function handleRemoveFromWish() {
    dispatch(removeFromWishlistThunk(productId))
  }

  function handleNavigate() {
    navigate('/login')
  }

  return (
    <article className={styles.card}>
      <div className={styles.productHeader}>
        <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
          {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
        </p>

        <button 
          className={styles.toggleFav} 
          onClick={
            !user
              ? handleNavigate
              : isInWish
                ? handleRemoveFromWish
                : handleAddToWish
          }
        >
          {isInWish ? '♥' : '♡'}
        </button>
      </div>

      <Link to={`/productos/${product.id}`}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
      </Link>

      <div className={styles.productFooter}>
        <h3 className={styles.price}>{product.price}€</h3>

        {quantity ? (
          <>
            <p>Cantidad: {quantity}</p>

            <Button onClick={handleRemoveToCart} size='small'>
              Eliminar del carrito
            </Button>
          </>
        ) : (
          <Button onClick={user? handleAddToCart : handleNavigate} size='small'>
            Añadir al carrito
          </Button>
        )}
      </div>
    </article>
  )
}

export default ProductCard