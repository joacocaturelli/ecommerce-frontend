import styles from './OrderCard.module.css'

function OrderProductCard({order}) {
  const [year, month, day] = order.createdAt.split('T')[0].split('-')

  return (
    <section>
      <h2>{order.id}</h2>

      {order.items.map((product) => (
        <section key={product.id}> 
          <h3>{product.productName}</h3>
          <p>{product.quantity} x {product.price}€ - {(product.price * product.quantity).toFixed(2)}€</p>
        </section>
      ))}
      
      <p>Fecha de compra: {day}/{month}/{year}</p>
      <h4>Total: {order.total}</h4>
    </section>
  )
}

export default OrderProductCard