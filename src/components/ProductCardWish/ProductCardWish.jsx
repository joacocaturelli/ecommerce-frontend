import { useDispatch } from 'react-redux'
import { addProductThunk } from '../../store/features/cartSlice'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import ButtonWishlist from '../ButtonWishlist/ButtonWishlist'
import styles from './ProductCardWish.module.css'

function ProductCardWish ({product}) {
  const dispatch = useDispatch()

  const productId = product.id

  function handleAddToCart() {
    dispatch(addProductThunk({productId, quantity: 1}))
  }

  return (
    <article className={styles.card}>

      <div className={styles.productHeader}>
        <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
          {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
        </p>

        <ButtonWishlist product={product}/>
      </div>

      <Link to={`/productos/${productId}`}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
      </Link>

      <div className={styles.productFooter}>
        <h3 className={styles.price}>{product.price}€</h3>

        <Button onClick={handleAddToCart}>
          Añadir al carrito
        </Button>
      </div>
      
    </article>
  )
}

export default ProductCardWish