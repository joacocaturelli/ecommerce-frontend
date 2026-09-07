import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOutThunk } from '../../store/features/authSlice'
import { clearCart } from '../../store/features/cartSlice'
import { clearWishlist } from '../../store/features/wishlistSlice'
import { selectIsAdmin } from '../../store/features/authSlice'
import Button from '../Button/Button'
import styles from './Header.module.css'

function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user} = useSelector((state) => state.auth)
  const cartCount = useSelector((state) => state.cart.items.length)
  const isAdmin = useSelector(selectIsAdmin)

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
    navigate('/cart')
  }

   function handleLogin() {
    navigate('/login')
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

        <NavLink to='/profile' className={({isActive}) => 
          isActive ? styles.activeLink : styles.link}
        >
          Perfil
        </NavLink>

        {isAdmin && 
          <NavLink to='/admin' className={({isActive}) => 
            isActive ? styles.activeLink : styles.link}
          >
            AdminPage
          </NavLink>
        }
      </nav>
  
      <div className={styles.status}>
        <span>{user ? user.name : 'Invitado'}</span>

        {user 
          ? (
            <>
              <Button onClick={handleCart} size='small'>
                Carrito: {cartCount}
              </Button>

              <Button onClick={handleLogout} size='small'>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button onClick={handleLogin} size='small'>
                Iniciar sesión
            </Button>
          )
        }
      </div>
    </header>
  )
}

export default Header