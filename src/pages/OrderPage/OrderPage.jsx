import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getOrderByIdThunk } from '../../store/features/orderSlice'
import OrderCard from '../../components/OrderCard/OrderCard'
import StatusMessage from '../../components/StatusMessage/StatusMessage'
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
      <section className={`container ${styles.orderContainer}`}>
        <h1>Orden</h1>

        {loading && (
          <StatusMessage 
            title="Cargando orden..." 
            description="Esperando respuesta del backend..." 
          />
        )}

        {error && (
          <StatusMessage 
            title={
              error.status === 404 
                ? "Orden no encontrada" 
                : "Ha ocurrido un error"
            }
            description={
              error.status === 404
                ? "La orden que buscas no existe o ya no está disponible."
                : error
            }
            variant="error"
          />
        )}

        {!loading && !error && currentOrder && (
          <>
            <OrderCard order={currentOrder} />

            <div className={styles.actions}>
              <NavLink
                to="/orders"
                className={styles.button}
              >
                Ver mis pedidos
              </NavLink>

              <NavLink
                to="/products"
                className={styles.button}
              >
                Seguir comprando
              </NavLink>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default OrderPage