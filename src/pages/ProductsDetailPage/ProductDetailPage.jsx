import { useParams } from "react-router-dom";
import { getProductById } from "../../api/products";
import { useState, useEffect } from "react";
import styles from './ProductDetailPage.module.css'
import StatusMessage from "../../components/StatusMessage/StatusMessage";

function ProductDetailPage() {
  const { productId } = useParams()
  
  const [product, setProduct] = useState(null) // Estado para el array de productos
  const [loading, setLoading] = useState(false) // Estado para Loading
  const [error, setError] = useState(null) // Estado para el manejo de errores
  const [count, setCount] = useState(1)

  const restar = () => {
    if(count > 1) {
      setCount(count - 1)
    }
  }

  useEffect(() => {
    async function showProduct() {
      try {
        setLoading(true)

        const data = await getProductById(productId) // Traemos el producto
        setProduct(data) // Lo guardamos en products

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false) // Indicamos en el estado de loading que no esta cargando
      }
    }
    showProduct()
  }, [productId]) // Solo se ejecuta useEffect al montar ProductsPage (solo una vez)

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
    </main>
  )
}

export default ProductDetailPage