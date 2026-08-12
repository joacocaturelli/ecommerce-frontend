import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getOrderByIdThunk } from '../../store/features/orderSlice'
import OrderProductCard from '../../components/OrderCard/OrderCard'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
import Button from '../../components/Button/Button'
import styles from './OrderPage.module.css'

function OrderPage() {
  const dispatch = useDispatch()
  const { orderId } = useParams()

  const { currentOrder, loading, error } = useSelector((state) => state.order)
  
  useEffect(() => {
    dispatch(getOrderByIdThunk(orderId))
  }, [dispatch, orderId])

  return (
    <main className="page">
      <section className="container">
        <h1>Orden</h1>

        {loading && (
          <StatusMessage 
            title='Cargando orden...' 
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

        {!loading && !error && currentOrder && (
          <>
            <OrderProductCard order={currentOrder} />
            <NavLink to={'/orders'}>
              <Button>
                Ver mis pedidos
              </Button>
            </NavLink>
            <NavLink to={'/productos'}>
              <Button>
                Seguir comprando
              </Button>
            </NavLink>
          </>
        )}
      </section>
    </main>
  );
}

export default OrderPage