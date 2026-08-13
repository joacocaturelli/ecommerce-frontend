import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import styles from './ReviewForm.module.css'

function ReviewForm ({review, onCreate, onUpdate, user}) {
  const navigate = useNavigate()

  const [rating, setRating] = useState(review?.rating ?? 0)
  const [comment, setComment] = useState(review?.comment ?? '')
  const [loading, setLoading] = useState(false)

  const ratingInputRef = useRef(null)

  useEffect(() => {
    ratingInputRef.current?.focus()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

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

  function handleNavigate() {
    navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit}>

      <label>
        <span className={styles.span}>Valoración:</span>

        <input 
          className={styles.input}
          ref={ratingInputRef}
          name="rating" 
          type="number" 
          min='1'
          max='5'
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
          disabled={loading}
        />
      </label>

      <label>
        <span className={styles.span}>Comentario:</span>

        <textarea 
          className={styles.input}
          name="comment" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          placeholder="Comenta que te pareció el producto" 
        />
      </label>

      <Button 
        type='submit' 
        size="small" 
        disabled={loading} 
        onClick={user ? null : handleNavigate}
      >
        {review ? 'Actualizar review' : 'Publicar Review'}
      </Button>
    </form>
  )
}

export default ReviewForm