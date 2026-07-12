import styles from "./ProductsPage.module.css"
import { mockProducts } from '../../data/mockProducts.js'
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx"
import { useState } from "react"

function ProductsPage() {

  const [search, setSearch] = useState('')

  const visibleProducts = mockProducts.filter(
    (product) => 
      product.name.toLowerCase().includes(search.toLowerCase()) || 
      product.tag.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <label className={styles.label} htmlFor="search">
          Buscar productos
        </label>
        <input 
          className={styles.input} 
          type="text" 
          id="search" 
          placeholder="Escribe para filtrar por nombre o categoria..." 
          value={search}
          onChange={(evento) => setSearch(evento.target.value)}
        />
      </section>
      <ProductGrid products={visibleProducts}/>
    </main>
  )
}

export default ProductsPage