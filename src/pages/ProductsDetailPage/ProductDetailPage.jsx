import { useParams } from "react-router-dom";
import { mockProducts } from "../../data/mockProducts";
import styles from './ProductDetailPage.module.css'

function ProductDetailPage() {
  const { productId } = useParams()
  const product = mockProducts.find((p) => p.id === productId)

  if(!product) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.notFound}>Producto no encontrado</p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.productHeader}>
          <p className={styles.label}>Detalle</p>
          <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
            {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
          </p>
        </div>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
        
        <span className={styles.tag}>{product.tag}</span>
        <p className={styles.price}>{product.price}€</p>
      </div>
    </main>
  )
}

export default ProductDetailPage