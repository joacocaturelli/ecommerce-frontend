import styles from './StatusMessage.module.css'

function StatusMessage({
  title,
  description,
  variant = 'neutral'
}) {
  const message =
    typeof description === 'string'
      ? description
      : description?.message

  return (
    <section className={`${styles.box} ${styles[variant]}`}>
      <h2 className={styles.title}>{title}</h2>

      {message && (
        <p className={styles.description}>{message}</p>
      )}
    </section>
  )
}

export default StatusMessage