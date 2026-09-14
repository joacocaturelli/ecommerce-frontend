import OrderCardList from "../OrderCardList/OrderCardList";
import StatusMessage from "../StatusMessage/StatusMessage";
import styles from './OrderList.module.css'

function OrderList({ orders }) {

  if (orders.length === 0) {
    return (
      <StatusMessage
        title="No hay pedidos todavía..."
        description='Puedes hacer tu compra con el botón "Comprar" en el carrito'
      />
    )
  }

  return (
    <section className={styles.orderList}>

      <h1 className={styles.title}>
        Pedidos
      </h1>

      <div className={styles.orderCards}>
        {orders.map((pedido, index) => (
          <OrderCardList
            key={pedido.id}
            order={pedido}
            num={orders.length - index}
          />
        ))}
      </div>

    </section>
  )
}

export default OrderList