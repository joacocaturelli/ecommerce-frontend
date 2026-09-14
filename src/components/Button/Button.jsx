import styles from './Button.module.css'

function Button({
  children,
  size = 'medium',
  variant = 'common',
  className = "",
  ...props
}) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button