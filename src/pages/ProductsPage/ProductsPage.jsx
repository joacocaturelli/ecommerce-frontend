import styles from "./ProductsPage.module.css"
import ProductGrid from "../../components/ProductGrid/ProductGrid.jsx"
import { useEffect, useState } from "react"
import { getProducts } from "../../api/products.js"
import StatusMessage from "../../components/StatusMessage/StatusMessage.jsx"

function ProductsPage() {

  const [products, setProducts] = useState([]) // Estado para el array de productos
  const [loading, setLoading] = useState(false) // Estado para Loading
  const [error, setError] = useState(null) // Estado para el manejo de errores
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function showProducts() {
      try {
        setLoading(true)

        const data = await getProducts() // Traemos los productos
        setProducts(data) // Los guardamos en products
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false) // Indicamos en el estado de loading que no esta cargando
      }
    }
    showProducts()
  }, []) // Solo se ejecuta useEffect al montar ProductsPage (solo una vez)

  const visibleProducts = products.filter(
    (product) => product.name.toLowerCase().includes(search.toLowerCase())
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