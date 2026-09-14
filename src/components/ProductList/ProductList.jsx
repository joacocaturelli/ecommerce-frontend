import ProductCardWish from "../ProductCardWish/ProductCardWish";
import ProductCardCart from "../ProductCardCart/ProductCardCart";
import StatusMessage from "../StatusMessage/StatusMessage";
import styles from './ProductList.module.css'

function ProductList({ products, cart = false }) {

  if (products?.length === 0) {
    return (
      <section className={`${styles.list} ${styles.empty}`}>
        {cart
          ? (
            <StatusMessage
              title="El carrito está vacío..."
              description='Puedes añadir productos con el botón "Añadir al carrito"'
            />
          )
          : (
            <StatusMessage
              title="La wishlist está vacía..."
              description="Puedes añadir productos con el botón de corazón en los productos"
            />
          )
        }
      </section>
    )
  }

  return (
    <section className={styles.list}>
      {products.map((item) => (
        cart
          ? (
            <ProductCardCart
              key={item.id}
              product={item.product}
              quantity={item.quantity}
            />
          )
          : (
            <ProductCardWish
              key={item.id}
              product={item}
            />
          )
      ))}
    </section>
  )
}

export default ProductList