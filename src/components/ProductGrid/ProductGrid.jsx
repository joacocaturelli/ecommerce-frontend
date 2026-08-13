import ProductCard from "../ProductCard/ProductCard";
import StatusMessage from "../StatusMessage/StatusMessage";
import styles from './ProductGrid.module.css'

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

      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
        />
      ))}

    </section>
  )
}

export default ProductGrid