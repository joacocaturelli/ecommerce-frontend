import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  logOutThunk,
  selectIsAdmin
} from "../../store/features/authSlice";
import { clearCart } from "../../store/features/cartSlice";
import { clearWishlist } from "../../store/features/wishlistSlice";
import Button from "../Button/Button";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const { user } = useSelector((state) => state.auth);

  const cartCount = useSelector(
    (state) => state.cart.items.length
  );

  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  function handleThemeToggle() {
    setDarkMode((prev) => !prev);
  }

  async function handleLogout() {
    const result = await dispatch(logOutThunk());

    if (logOutThunk.fulfilled.match(result)) {
      dispatch(clearCart());
      dispatch(clearWishlist());
      navigate("/login");
    }

    setMenuOpen(false);
  }

  function handleLogin() {
    navigate("/login");
    setMenuOpen(false);
  }

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* LOGO */}

        <Link
          to="/"
          className={styles.logo}
          onClick={handleNavClick}
        >
          <span className={styles.logoMain}>
            React Shop
          </span>

          <span className={styles.logoSub}>
            Lab
          </span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className={styles.nav}>
          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? styles.activeLink
                  : styles.link
              }
            >
              Admin
            </NavLink>
          )}

          {user && (
            <>
              <NavLink
                to="/cart"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? styles.activeLink
                    : styles.link
                }
              >
                Carrito

                <span className={styles.count}>
                  {cartCount}
                </span>
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? styles.activeLink
                    : styles.link
                }
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/orders"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? styles.activeLink
                    : styles.link
                }
              >
                Pedidos
              </NavLink>
            </>
          )}

          <NavLink
            to="/products"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? styles.activeLink
                : styles.link
            }
          >
            Colección
          </NavLink>
        </nav>


        {/* DESKTOP USER / THEME */}

        <div className={styles.status}>

          <button
            type="button"
            className={styles.themeButton}
            onClick={handleThemeToggle}
            aria-label={
              darkMode
                ? "Activar modo claro"
                : "Activar modo oscuro"
            }
            title={
              darkMode
                ? "Activar modo claro"
                : "Activar modo oscuro"
            }
          >
            <span
              className={styles.themeIcon}
              aria-hidden="true"
            >
              {darkMode ? "☀" : "☾"}
            </span>
          </button>


          {user ? (
            <>
              <Link
                to="/profile"
                className={styles.user}
                onClick={handleNavClick}
              >
                {user.name}
              </Link>

              <Button
                onClick={handleLogout}
                size="small"
                className={styles.logoutButton}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <span className={styles.guest}>
                Invitado
              </span>

              <Button
                onClick={handleLogin}
                size="small"
                className={styles.loginButton}
              >
                Iniciar sesión
              </Button>
            </>
          )}
        </div>


        {/* HAMBURGER */}

        <button
          type="button"
          className={`${styles.hamburger} ${
            menuOpen ? styles.hamburgerOpen : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen
              ? "Cerrar menú"
              : "Abrir menú"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>


      {/* MOBILE MENU */}

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${
          menuOpen
            ? styles.mobileMenuOpen
            : ""
        }`}
      >

        {/* MOBILE NAVIGATION */}

        <nav className={styles.mobileNav}>

          {isAdmin && (
            <NavLink
              to="/admin"
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? styles.mobileActiveLink
                  : styles.mobileLink
              }
            >
              <span>01</span>
              Admin
            </NavLink>
          )}


          {user && (
            <>
              <NavLink
                to="/cart"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? styles.mobileActiveLink
                    : styles.mobileLink
                }
              >
                <span>
                  {isAdmin ? "02" : "01"}
                </span>

                Carrito

                <small>
                  {cartCount}
                </small>
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? styles.mobileActiveLink
                    : styles.mobileLink
                }
              >
                <span>
                  {isAdmin ? "03" : "02"}
                </span>

                Wishlist
              </NavLink>

              <NavLink
                to="/orders"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  isActive
                    ? styles.mobileActiveLink
                    : styles.mobileLink
                }
              >
                <span>
                  {isAdmin ? "04" : "03"}
                </span>

                Pedidos
              </NavLink>
            </>
          )}


          <NavLink
            to="/products"
            onClick={handleNavClick}
            className={({ isActive }) =>
              isActive
                ? styles.mobileActiveLink
                : styles.mobileLink
            }
          >
            <span>
              {user
                ? isAdmin
                  ? "05"
                  : "04"
                : "01"}
            </span>

            Colección
          </NavLink>

        </nav>


        {/* MOBILE USER / ACTIONS */}

        <div className={styles.mobileStatus}>

          <div className={styles.mobileUser}>
            <span className={styles.mobileUserLabel}>
              {user
                ? "Sesión iniciada"
                : "Sesión"}
            </span>

            {user ? (
              <Link
                to="/profile"
                onClick={handleNavClick}
                className={styles.mobileUserName}
              >
                {user.name}
              </Link>
            ) : (
              <span className={styles.mobileUserName}>
                Invitado
              </span>
            )}
          </div>


          {user ? (
            <Button
              onClick={handleLogout}
              size="small"
              className={styles.mobileLogout}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              size="small"
              className={styles.mobileLogin}
            >
              Iniciar sesión
            </Button>
          )}


          <button
            type="button"
            className={styles.themeButton}
            onClick={handleThemeToggle}
            aria-label={
              darkMode
                ? "Activar modo claro"
                : "Activar modo oscuro"
            }
            title={
              darkMode
                ? "Activar modo claro"
                : "Activar modo oscuro"
            }
          >
            <span
              className={styles.themeIcon}
              aria-hidden="true"
            >
              {darkMode ? "☀" : "☾"}
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;
