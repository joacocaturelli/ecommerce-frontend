import styles from './StarRating.module.css'

function StarRating({ rating }) {
  return (
    <div
      className={styles.stars}
      aria-label={`Valoración: ${rating} de 5`}
      role="img"
    >
      <span className={styles.filled}>
        {"★".repeat(rating)}
      </span>

      <span className={styles.empty}>
        {"☆".repeat(5 - rating)}
      </span>
    </div>
  );
}

export default StarRating;