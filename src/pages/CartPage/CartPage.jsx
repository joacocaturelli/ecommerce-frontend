import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutThunk } from '../../store/features/cartSlice'
import ProductList from '../../components/ProductList/ProductList'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import Button from '../../components/Button/Button'
import styles from './CartPage.module.css'

function CartPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { items, loading, error, lastOrder } = useSelector((state) => state.cart)

  const totalInCents = items.reduce((acc, item) => {
    const priceInCents = Math.round(
      Number(item.product.price) * 100
    )

    return acc + priceInCents * item.quantity
  }, 0)

  const total = (totalInCents / 100).toFixed(2)
  
  async function handleCheckOut() {
    const order = await dispatch(checkoutThunk()).unwrap()
    navigate(`/order/${order.id}`)
  }

  return (
    <main className="page">
      <section className="container">
        <h1>Carrito</h1>

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

        {!loading && !error && 
          <ProductList products={items} cart={true}/>
        }
        
        <div>
          <p>Total: {total}€</p>
          <Button onClick={handleCheckOut}>
            Comprar
          </Button>
        </div>
      </section>
    </main>
  );
}

export default CartPage