import styles from './AdminPage.module.css'

function AdminPage () {
  return (
    <main className="page">
      <section className="container">
        <div className={styles.container}>
          <h2>Admin Dashboard</h2>
          <p>Bienvenido al panel de administración</p>
        </div>
      </section>
    </main>
  )
}

export default AdminPage