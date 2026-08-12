import Button from '../../components/Button/Button'
import { NavLink } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.notFound}>
        <p className={styles.code}>404</p>
        <h2>Página no encontrada</h2>
      </div>
      <Button>
        <NavLink to={'/'}>
          Volver a la Home
        </NavLink>
      </Button>
    </main>
  )
}

export default NotFoundPage