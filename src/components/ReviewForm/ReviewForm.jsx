import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import styles from './ReviewForm.module.css'

function ReviewForm({ review, onCreate, onUpdate, user }) {
  const navigate = useNavigate()

  const [rating, setRating] = useState(review?.rating ?? 0)
  const [comment, setComment] = useState(review?.comment ?? '')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    try {
      setLoading(true)

      if (review) {
        await onUpdate(rating, comment)
      } else {
        await onCreate(rating, comment)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <label className={styles.field}>
        <span className={styles.label}>
          Valoración:
        </span>

        <input
          className={styles.input}
          name="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>
          Comentario:
        </span>

        <textarea
          className={styles.input}
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          placeholder="Comenta qué te pareció el producto"
        />
      </label>

      <Button
        type="submit"
        size="small"
        disabled={loading}
      >
        {review ? 'Actualizar review' : 'Publicar review'}
      </Button>
    </form>
  )
}

export default ReviewForm