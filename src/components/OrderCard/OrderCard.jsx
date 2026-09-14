import styles from './OrderCard.module.css'

function OrderCard({ order }) {
  const [year, month, day] = order.createdAt.split('T')[0].split('-')

  return (
    <section className={styles.orderCard}>
      <header className={styles.orderHeader}>
        <div>
          <h2>Pedido #{order.id}</h2>

          <p className={styles.status}>
            Estado: {order.status}
          </p>
        </div>

        <p className={styles.date}>
          {day}/{month}/{year}
        </p>
      </header>

      <div className={styles.items}>
        {order.items.map((product) => (
          <article
            className={styles.item}
            key={product.id}
          >
            <div className={styles.itemInfo}>
              <h3>{product.productName}</h3>

              <p>
                {product.quantity} × {product.price}€
              </p>
            </div>

            <p className={styles.itemTotal}>
              {(product.price * product.quantity).toFixed(2)}€
            </p>
          </article>
        ))}
      </div>

      <footer className={styles.orderFooter}>
        <span>Total</span>

        <strong>{order.total}€</strong>
      </footer>
    </section>
  )
}

export default OrderCard