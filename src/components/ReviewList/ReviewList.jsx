import { useReviews } from '../../hooks/useReviews'
import ReviewForm from '../ReviewForm/ReviewForm'
import StatusMessage from '../StatusMessage/StatusMessage'
import StarRating from '../StarRating/StarRating'
import styles from './ReviewList.module.css'

function ReviewList({ productId, user }) {

  const {
    reviews,
    revLoading,
    revError,
    createReview,
    updateReview,
    deleteReview
  } = useReviews(productId)

  const userReview = reviews.find(
    (review) => review.userId === user?.id
  )

  const filteredReviews = reviews.filter(
    (review) => review.userId !== user?.id
  )

  if (revLoading) {
    return (
      <section className={styles.container}>
        <StatusMessage
          title="Cargando reviews"
          description="Consultando opiniones de usuarios..."
        />
      </section>
    )
  }

  if (revError) {
    return (
      <section className={styles.container}>
        <StatusMessage
          title="Error con las reviews"
          description={revError}
          variant="error"
        />
      </section>
    )
  }

  return (
    <section className={styles.container}>

      <h2 className={styles.title}>
        Reviews
      </h2>

      <ReviewForm
        review={userReview}
        onCreate={createReview}
        onUpdate={updateReview}
        user={user}
      />

      {reviews.length === 0 ? (
        <StatusMessage
          title="Sin reviews"
          description="El producto todavía no tiene valoraciones"
        />
      ) : (
        <>

          {userReview && (
            <article className={styles.userReview}>

              <div className={styles.reviewHeader}>
                <StarRating rating={userReview.rating} />

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={deleteReview}
                  aria-label="Eliminar review"
                >
                  Eliminar
                </button>
              </div>

              <p className={styles.comment}>
                {userReview.comment}
              </p>

            </article>
          )}

          {filteredReviews.length > 0 && (
            <div className={styles.reviewsContainer}>

              {filteredReviews.map((review) => (
                <article
                  className={styles.review}
                  key={review.userId}
                >
                  <StarRating rating={review.rating} />

                  <p className={styles.comment}>
                    {review.comment}
                  </p>
                </article>
              ))}

            </div>
          )}

        </>
      )}

    </section>
  )
}

export default ReviewList