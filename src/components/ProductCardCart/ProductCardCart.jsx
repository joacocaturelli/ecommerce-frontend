import { useDispatch } from 'react-redux'
import { removeProductThunk } from '../../store/features/cartSlice'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './ProductCardCart.module.css'

function ProductCardCart({ product, quantity }) {
  const dispatch = useDispatch()

  const productId = product.id

  function handleRemoveToCart() {
    dispatch(removeProductThunk(productId))
  }

  return (
    <article className={styles.card}>

      <Link
        to={`/products/${productId}`}
        className={styles.imageContainer}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <div className={styles.productHeader}>
        <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
          {product.stock > 0 ? 'En stock' : 'Sin stock'}
        </p>
      </div>

      <Link
        to={`/products/${productId}`}
        className={styles.productInfo}
      >
        <h2 className={styles.title}>
          {product.name}
        </h2>

        <p className={styles.description}>
          {product.description}
        </p>
      </Link>

      <div className={styles.productFooter}>
        <h3 className={styles.price}>
          {product.price}€
        </h3>

        <p className={styles.quantity}>
          Cantidad: {quantity}
        </p>

        <div className={styles.removeButton}>
          <Button
            onClick={handleRemoveToCart}
            size="small"
          >
            Eliminar del carrito
          </Button>
        </div>
      </div>

    </article>
  )
}

export default ProductCardCart