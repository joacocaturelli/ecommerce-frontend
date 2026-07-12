import { Link } from "react-router-dom"
import styles from './HomePage.module.css'

function HomePage () {
  return (
    <main className={styles.page}>
      <article className={styles.container}>
        <div className={styles.infoContainer}>
          <p className={styles.selection}>EDITORIAL SELECTION</p>
          <h1 className={styles.title}>Prendas, calzado y accesorios con una línea más sobria y atemporal.</h1>
          <p className={styles.text}> Descubre una selección pensada para vestir el día a día con equilibrio, comodidad y una estética más cuidada.</p>
        </div>
        <div className={styles.linkContainer}>
          <p className={styles.text2}>Colección de temporada con envíos rápidos, cambios sencillos y una presentación más limpia del producto.</p>
          <Link className="button" to='/productos'>Ver colección</Link>
        </div>
      </article>
    </main>
  )
}

export default HomePage