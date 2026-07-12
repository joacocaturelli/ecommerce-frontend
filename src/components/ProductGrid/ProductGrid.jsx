import ProductCard from "../ProductCard/ProductCard";
import styles from './ProductGrid.module.css'

function ProductGrid({products}) {
  return (
    <section className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p}/>
      ))}
    </section>
  )
}

export default ProductGrid