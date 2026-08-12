import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as wishlistThunk from '../../store/features/wishlistSlice.js'
import ProductList from '../../components/ProductList/ProductList'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import styles from './WishlistPage.module.css'

function WishlistPage() {
  const dispatch = useDispatch()

  const {items, loading, error} = useSelector((state) => state.wishlist)
  
  return (
    <main className="page">
      <section className="container">

        <h1>Wishlist</h1>

        {loading && (
          <StatusMessage 
            title='Cargando wishlist...' 
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

        {!loading && !error && <ProductList products={items}/>}
      </section>
    </main>
  );
}

export default WishlistPage