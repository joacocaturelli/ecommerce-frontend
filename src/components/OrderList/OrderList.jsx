import OrderCardList from "../OrderCardList/OrderCardList";
import StatusMessage from "../StatusMessage/StatusMessage";
import styles from './OrderList.module.css'

function OrderList({orders}) {
 
  if (orders.length === 0) {
    return (
      <section className='container'>
        <StatusMessage 
          title='No hay pedidos todavia...'
          description='Puedes hacer tu compra con el boton "Comprar" en el carrito'
        />
      </section>
    )
  }
  
  return (
    <section className='containerList'>
      <div className={styles.orderCardsContainer}>

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