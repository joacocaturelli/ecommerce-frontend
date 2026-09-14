import ProductCard from "../ProductCard/ProductCard";
import ProductCardAdmin from "../ProductCardAdmin/ProductCardAdmin";
import StatusMessage from "../StatusMessage/StatusMessage";
import styles from './ProductGrid.module.css'

function ProductGrid({
  products,
  admin = false,
  deactivateProduct,
  activateProduct
}) {

  if (products.length === 0) {
    return (
      <section className={`${styles.grid} ${styles.empty}`}>
        <StatusMessage
          title="No se ha encontrado ningún producto con ese nombre..."
          description="Prueba buscando algún otro producto"
        />
      </section>
    )
  }

  return (
    <section className={styles.grid}>
      {products.map((product) =>
        admin ? (
          <ProductCardAdmin
            key={product.id}
            product={product}
            deactivateProduct={deactivateProduct}
            activateProduct={activateProduct}
          />
        ) : (
          <ProductCard
            key={product.id}
            product={product}
          />
        )
      )}
    </section>
  )
}

export default ProductGrid