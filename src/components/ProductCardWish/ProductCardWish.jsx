import { useDispatch } from 'react-redux'
import { addProductThunk } from '../../store/features/cartSlice'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import ButtonWishlist from '../ButtonWishlist/ButtonWishlist'
import styles from './ProductCardWish.module.css'

function ProductCardWish({ product }) {
  const dispatch = useDispatch()

  const productId = product.id

  function handleAddToCart() {
    dispatch(
      addProductThunk({
        productId,
        quantity: 1
      })
    )
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
        <p
          className={
            product.stock > 0
              ? styles.stockOk
              : styles.stockNo
          }
        >
          {product.stock > 0 ? 'En stock' : 'Sin stock'}
        </p>

        <ButtonWishlist product={product} />
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

        <Button
          onClick={handleAddToCart}
          size="small"
          disabled={product.stock <= 0}
        >
          Añadir al carrito
        </Button>
      </div>

    </article>
  )
}

export default ProductCardWish