import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { hideToast } from '../../store/features/toastSlice'
import styles from './Toast.module.css'

function Toast() {
  const dispatch = useDispatch()

  const { message, type } = useSelector(
    (state) => state.toast
  )

  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      dispatch(hideToast())
    }, 3000)

    return () => clearTimeout(timer)
  }, [message, dispatch])

  if (!message) {
    return null
  }

  function handleClose() {
    dispatch(hideToast())
  }

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role="status"
      aria-live="polite"
    >
      <p>{message}</p>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  )
}

export default Toast