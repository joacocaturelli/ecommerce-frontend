import styles from './ProductCard.module.css'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    <article className={styles.card}>
      <div className={styles.productHeader}>
        <span className={styles.tag}>{product.tag}</span>
        <p className={product.stock > 0 ? styles.stockOk : styles.stockNo}>
          {product.stock > 0 ? 'En Stock' : 'Sin Stock'}
        </p>
      </div>
      
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.productFooter}>
        <h3 className={styles.price}>{product.price}€</h3>

        <Link className="button-xs"  to={`/productos/${product.id}`}>
          Ver producto
        </Link>
      </div>

    </article>
  )
}

export default ProductCard