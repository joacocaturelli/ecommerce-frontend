import styles from './StarRating.module.css'

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </div>
  );
}

export default StarRating;
