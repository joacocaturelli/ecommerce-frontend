import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from './Layout.module.css'
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../store/features/cartSlice";
import { useEffect } from "react";
import { getMeThunk } from "../../store/features/authSlice";
import { getWishlistThunk } from "../../store/features/wishlistSlice";

function Layout() {
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  // Cargamos el usuario autenticado
  useEffect(() => {
    dispatch(getMeThunk())
  }, [dispatch])

  // Cuando tenemos usuario cargamos su carrito y wishlist
  useEffect(() => {
    if (!user) return

    dispatch(getCartThunk())
    dispatch(getWishlistThunk())
  }, [dispatch, user])

  return (
    <div className={styles.container}>
      <Header />
      <Outlet /> {/*Sirve para inyectar la pagina actual*/}
      <Footer />
    </div>
  )
}

export default Layout