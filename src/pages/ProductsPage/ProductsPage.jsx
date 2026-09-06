import { useState, useRef, useEffect, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts.js";
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx"
import StatusMessage from "../../components/StatusMessage/StatusMessage.jsx"
import styles from "./ProductsPage.module.css"

function ProductsPage() {
  const labelInputRef = useRef(null) // Creamos la variable para el hook

  const { products, loading, error } = useProducts() // Importamos las variables del hook

  const [search, setSearch] = useState(""); // Estado para el buscador de productos
  const [sortBy, setSortBy] = useState('name')

  // Filtramos lo que busca el usuario con el array de productos
  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => 
        product.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'priceMin') {
          return a.price - b.price 
        } else if (sortBy === 'priceMax') {
          return b.price - a.price
        } else {
          return a.name.localeCompare(b.name)
        }
      })
  }, [products, search, sortBy])

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

        <select
          className={styles.select}
          value={sortBy}
          onChange={(evento) => setSortBy(evento.target.value)}  
        >
          <option value='name'>Ordenar por nombre</option>
          <option value='priceMin'>Ordenar por precio descendente</option>
          <option value='priceMax'>Ordenar por precio ascendente</option>
        </select>
        
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