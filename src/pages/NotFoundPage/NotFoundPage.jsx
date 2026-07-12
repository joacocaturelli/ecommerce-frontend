import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.notFound}>
        <p className={styles.code}>404</p>
        <h2>Página no encontrada</h2>
      </div>
    </main>
  )
}

export default NotFoundPage