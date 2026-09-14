import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductThunk } from '../../store/features/cartSlice'
import Button from '../Button/Button'
import ButtonWishlist from '../ButtonWishlist/ButtonWishlist'
import styles from './ProductCard.module.css'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const productId = product.id

  function handleAddToCart() {
    dispatch(addProductThunk({ productId, quantity: 1 }))
  }

  function handleNavigate() {
    navigate('/login')
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

        <ButtonWishlist product={product} />
      </div>

      <Link
        to={`/products/${productId}`}
        className={styles.productInfo}
      >
        <h2 className={styles.title}>
          {product.name}
        </h2>
      </Link>

      <div className={styles.productFooter}>
        <h3 className={styles.price}>
          {product.price}€
        </h3>

        <Button
          onClick={user ? handleAddToCart : handleNavigate}
          size="small"
          disabled={product.stock <= 0}
        >
          Añadir al carrito
        </Button>
      </div>
    </article>
  )
}

export default ProductCard