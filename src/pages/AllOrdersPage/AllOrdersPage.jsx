import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../store/features/orderSlice.js";
import OrderList from '../../components/OrderList/OrderList'
import StatusMessage from "../../components/StatusMessage/StatusMessage.jsx"
import styles from "./AllOrdersPage.module.css"

function AllOrdersPage() {
  const dispatch = useDispatch()

  const { orders, loading, error } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [dispatch])

  return (
    <main className='page'>
      {loading && (
        <StatusMessage 
          title='Cargando pedidos...' 
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

      {!loading && !error && <OrderList orders={orders}/>}
    </main>
  )
}

export default AllOrdersPage