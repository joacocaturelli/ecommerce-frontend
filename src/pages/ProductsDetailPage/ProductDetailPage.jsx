import { useParams } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "../../hooks/useProduct";
import ReviewList from "../../components/ReviewList/ReviewList";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import styles from './ProductDetailPage.module.css'

function ProductDetailPage() {
  const { productId } = useParams()
  const {product, loading, error} = useProduct(productId)

  const [count, setCount] = useState(1)

  const restar = () => {
    if(count > 1) {
      setCount(count - 1)
    }
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
    <main className={styles.page}>
      <div className={styles.container}>
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
            <span className={styles.quantity}>{count}</span>
            <button className={styles.btnCart} onClick={() => setCount(count + 1)}>+</button>
          </div>
          <button className={styles.btnCart1}>Añadir al carrito</button>
          <button className={styles.btnCart2}>Añadir a la wishlist</button>
        </div>
      </div>
      <ReviewList productId={productId}/>
    </main>
  )
}

export default ProductDetailPage