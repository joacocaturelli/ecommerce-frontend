import { useDispatch } from 'react-redux'
import { removeProductThunk } from '../../store/features/cartSlice'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './ProductCardCart.module.css'

function ProductCardCart ({product, quantity}) {
  const dispatch = useDispatch()

  const productId = product.id

  function handleRemoveToCart() {
    dispatch(removeProductThunk(productId))
  }

  return (
    <article className={styles.card}>

      <div className={styles.productHeader}>

        <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
          {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
        </p>

      </div>

      <Link to={`/productos/${productId}`}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
      </Link>

      <div className={styles.productFooter}>

        <h3 className={styles.price}>{product.price}€</h3>
        <p>Cantidad: {quantity}</p>

        <Button onClick={handleRemoveToCart} size='small'>
          Eliminar del carrito
        </Button>

      </div>

    </article>
  )
}

export default ProductCardCart