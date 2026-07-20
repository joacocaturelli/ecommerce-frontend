import styles from './Button.module.css'

function Button({
  children,
  size = 'medium',
  variant = 'common',
  ...props
}) {
  return (
    <button 
      className={ `${styles.button} ${styles[size]} ${styles[variant]}` }
      {...props}
    >
      {children}
    </button>
  )
}

export default Button