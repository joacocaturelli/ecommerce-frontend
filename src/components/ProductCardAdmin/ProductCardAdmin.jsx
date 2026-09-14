import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './ProductCardAdmin.module.css'

function ProductCardAdmin({
  product,
  deactivateProduct,
  activateProduct
}) {
  function handleToggleActive() {
    if (product.isActive) {
      deactivateProduct(product.id)
    } else {
      activateProduct(product.id)
    }
  }

  return (
    <article className={styles.card}>

      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
        />
      </div>

      <div className={styles.productHeader}>
        <p className={product.isActive ? styles.active : styles.inactive}>
          {product.isActive ? 'Activo' : 'Inactivo'}
        </p>

        <p className={styles.stock}>
          Stock: {product.stock}
        </p>
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.title}>
          {product.name}
        </h2>

        <p className={styles.description}>
          {product.description}
        </p>
      </div>

      <div className={styles.productFooter}>
        <h3 className={styles.price}>
          {product.price}€
        </h3>

        <div className={styles.actions}>
          <Link
            to={`/admin/products/form/${product.id}`}
            className={styles.updateButton}
          >
            Editar
          </Link>

          <Button
            onClick={handleToggleActive}
            size="small"
            variant={product.isActive ? 'adminDanger' : 'common'}
          >
            {product.isActive ? 'Desactivar' : 'Activar'}
          </Button>
        </div>
      </div>

    </article>
  )
}

export default ProductCardAdmin