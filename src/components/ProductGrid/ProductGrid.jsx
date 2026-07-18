import ProductCard from "../ProductCard/ProductCard";
import styles from './ProductGrid.module.css'
import StatusMessage from "../StatusMessage/StatusMessage";

function ProductGrid({products}) {

  if (products.length === 0) {
    return (
      <section className={styles.grid}>
        <StatusMessage 
          title='No se ha encontrado ningun producto con ese nombre...'
          description='Prueba buscando algun otro producto'
        />
      </section>
    )
  }
  
  return (
    <section className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p}/>
      ))}
    </section>
  )
}

export default ProductGrid