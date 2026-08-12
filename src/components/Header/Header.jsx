import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutThunk } from '../../store/features/authSlice'
import { clearCart } from '../../store/features/cartSlice'
import { clearWishlist } from '../../store/features/wishlistSlice'
import styles from './Header.module.css'
import Button from '../Button/Button'

// Cómo leer del store con useSelector
//  useSelector recibe una función que selecciona un trozo del estado.

// useSelector((state) => state.auth.user)
//   state            → el estado completo del store
//   state.auth       → el estado del slice 'auth'
//   state.auth.user  → la propiedad user del slice auth

// React re-renderiza el componente automáticamente cuando ese valor cambia.

function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user} = useSelector((state) => state.auth)
  const cartCount = useSelector((state) => state.cart.items.length)

  // Al hacer el logout limpiamos el carrito y la wishlist
  async function handleLogout() {
    const result = await dispatch(logOutThunk())
    
    if (logOutThunk.fulfilled.match(result)) {
      dispatch(clearCart())
      dispatch(clearWishlist())
      navigate('/login')
    }
  }

  function handleCart() {
    navigate('cart')
  }

  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>React Shop Lab</h1>
      </div>
      <nav className={styles.nav}>
        <NavLink to='/' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Inicio
        </NavLink>
        <NavLink to='/productos' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Colección
        </NavLink>
        <NavLink to='/admin' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          AdminPage
        </NavLink>
        <NavLink to='/login' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Login
        </NavLink>
        <NavLink to='/register' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Register
        </NavLink>
        <NavLink to='/wishlist' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Wishlist
        </NavLink>
        <NavLink to='/orders' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Pedidos
        </NavLink>
      </nav>
  
      <div className={styles.status}>
        <span>{user ? user.name : 'Invitado'}</span>
        <Button onClick={handleCart} size='small'>
          Carrito: {cartCount}
        </Button>
        {user && (
          <Button onClick={handleLogout} size='small'>
            Cerrar Sesión
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header