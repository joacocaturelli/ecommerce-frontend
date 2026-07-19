import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

function Header () {
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
      </nav>
    </header>
  )
}

export default Header