import { useState, useRef, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts.js";
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx"
import StatusMessage from "../../components/StatusMessage/StatusMessage.jsx"
import styles from "./ProductsPage.module.css"

function ProductsPage() {
  const {products, loading, error} = useProducts() // Importamos las variables del hook
  const labelInputRef = useRef(null) // Creamos la variable para el hook
  const [search, setSearch] = useState(""); // Estado para el buscador de productos

  // Filtramos lo que busca el usuario con el array de productos
  const visibleProducts = products.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    labelInputRef.current?.focus()
  },[])

  return (
    <main className='page'>
      <section className={styles.hero}>
        <label className={styles.label} htmlFor="search" ref={labelInputRef}>
          Buscar productos
        </label>
        <input 
          className={styles.input} 
          type="text" 
          id="search" 
          placeholder="Buscar productos..." 
          value={search}
          onChange={(evento) => setSearch(evento.target.value)}
        />
      </section>

      {loading && (
        <StatusMessage 
          title='Cargando productos...' 
          description='Esperando respuesta del backend...' 
        />
      )}

      {error && (
        <StatusMessage 
          title='Ha ocurrido un error'
          description={error}
          variant="error"
        />
      )}

      {!loading && !error && <ProductGrid products={visibleProducts}/>}
    </main>
  )
}

export default ProductsPage