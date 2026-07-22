import { useReviews } from '../../hooks/useReviews'
import StatusMessage from '../StatusMessage/StatusMessage'
import StarRating from '../StarRating/StarRating'
import styles from './ReviewList.module.css'

function ReviewList({ productId }) {
  const {reviews, loading, error} = useReviews(productId)

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <StatusMessage
            title='Cargando reviews' 
            description='Consultando opiniones de usuarios...' 
          />
        </div>
      </main>
    )
  }
  
  
  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <StatusMessage 
            title='Error al cargar las reviews'
            description={error}
            variant="error"
            />
        </div>
      </main>
    )
  }
  
  if(reviews.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <StatusMessage 
            title='Sin Reviews'
            description='El producto todavia no tiene valoraciones'
          />
        </div>
      </main>
    )
  }

  return (
    <section className='container'>
      <h3>Reviews</h3>
      <div className={styles.reviewsContainer}>
        {reviews.map((review) => (
          <article key={review.id}>
            <StarRating rating={review.rating}/>
            <p className={styles.comment}>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ReviewList