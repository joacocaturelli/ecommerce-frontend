import { NavLink } from 'react-router-dom'
import styles from './OrderCardList.module.css'

function OrderCardList({ order, num }) {
  const [year, month, day] = order.createdAt
    .split('T')[0]
    .split('-')

  return (
    <article className={styles.orderCard}>

      <div className={styles.orderInfo}>
        <h3>
          Pedido #{num}
        </h3>

        <p>
          <span>Id:</span> {order.id}
        </p>

        <p>
          <span>Estado:</span> {order.status}
        </p>

        <p>
          <span>Fecha:</span> {day}/{month}/{year}
        </p>

        <p className={styles.total}>
          Total: {order.total}€
        </p>
      </div>

      <NavLink
        to={`/order/${order.id}`}
        className={styles.orderButton}
      >
        Ver pedido
      </NavLink>

    </article>
  )
}

export default OrderCardList