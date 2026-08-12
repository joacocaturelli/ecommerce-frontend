import ProductCard from "../ProductCard/ProductCard";
import StatusMessage from "../StatusMessage/StatusMessage";
import styles from './ProductList.module.css'

function ProductList({products, cart = false}) {

  if (products.length === 0) {
    return (
      <section className={styles.list}>
        {cart 
          ?
            <StatusMessage 
              title='El carrito esta vacio...'
              description='Puedes añadir productos con el botón "Añadir al carrito"'
            />
          :
            <StatusMessage 
                title='La wishlist esta vacia...'
                description='Puedes añadir productos con el botón de corazon en los productos'
            />
        }
      </section>
    )
  }
  
  return (
    <section className={styles.productList}>
      {products.map((item) => (
        <ProductCard
          key={item.id}
          product={cart ? item.product : item}
          quantity={cart ? item.quantity : undefined}
        />
      ))}
    </section>
  )
}

export default ProductList