import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProduct } from "../../hooks/useProduct";
import { addProductThunk } from '../../store/features/cartSlice.js';
import { addToWishlistThunk, removeFromWishlistThunk } from '../../store/features/wishlistSlice'
import Button from "../../components/Button/Button";
import ReviewList from "../../components/ReviewList/ReviewList";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import styles from './ProductDetailPage.module.css'

function ProductDetailPage() {
  const dispatch = useDispatch()

  const { productId } = useParams()
  const { product, loading, error } = useProduct(productId)

  const [ quantity, setQuantity ] = useState(1)

  const { user } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.wishlist)

  const isInWish = items.some((item) => item.id === productId)

  const restar = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  function handleAddToCart() {
    dispatch(addProductThunk({productId, quantity}))
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

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <StatusMessage
            title='Cargando producto...' 
            description='Esperando respuesta del backend...' 
          />
        </div>
      </main>
    )
  }
  
  if(!product) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <StatusMessage 
            title='Producto no encontrado...'
            description='Prueba buscando algun otro producto'
          />
        </div>
      </main>
    )
  }

   if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <StatusMessage 
            title='Ha ocurrido un error'
            description={error}
            variant="error"
          />
        </div>
      </main>
    )
  }

  return (
    <main className='page'>
      <div className='container'>

        <div className={styles.infoProduct}>

          <div className={styles.productHeader}>
            <p className={styles.label}>Detalle</p>
            <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
              {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
            </p>
          </div>

          <h2 className={styles.title}>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{product.price}€</p>

        </div>

        <div className={styles.infoCart}>

          <div className={styles.counter}>

            <button className={styles.btnCart} onClick={restar}>-</button>

            <span className={styles.quantity}>{quantity}</span>
            
            <button className={styles.btnCart} onClick={() => setQuantity(quantity + 1)}>+</button>

          </div>

          <div className={styles.btnCartContainer}>
            <Button onClick={handleAddToCart}>Añadir al carrito </Button>
            
            <Button onClick={
              !user
                ? handleNavigate
                : isInWish 
                  ? handleRemoveFromWish
                  : handleAddToWish
              }
            >
              {isInWish
                ? 'Eliminar de la wishlist'
                : 'Añadir a la wishlist'
              }
            </Button>
          </div>

        </div>
      </div>
      
      <ReviewList 
        productId={productId} 
        user={user}
      />
    </main>
  )
}

export default ProductDetailPage