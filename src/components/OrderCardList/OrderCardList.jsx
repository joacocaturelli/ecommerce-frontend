import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import styles from './OrderCardList.module.css'

function OrderCardList({order, num}) {
  const [year, month, day] = order.createdAt.split('T')[0].split('-')

  return (
    <section className={styles.orderCard}>
      <div>
        <h3>Pedido #{num}</h3>
        <p>Id: {order.id}</p>
        <h2>Total: {order.total}</h2>
        <p>Fecha: {day}/{month}/{year}</p>
      </div>

      <Button>
        <NavLink to={`/order/${order.id}`}>
          Ver pedido
        </NavLink>
      </Button>
    </section>
  )
}

export default OrderCardList