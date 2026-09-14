import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistThunk } from "../../store/features/wishlistSlice";
import { getCartThunk } from "../../store/features/cartSlice";
import { getMeThunk } from "../../store/features/authSlice";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Toast from "../Toast/Toast";
import styles from "./Layout.module.css";

function Layout() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // Cargamos el usuario autenticado
  useEffect(() => {
    dispatch(getMeThunk());
  }, [dispatch]);

  // Cuando tenemos usuario cargamos su carrito y wishlist
  useEffect(() => {
    if (!user) return;

    dispatch(getCartThunk());
    dispatch(getWishlistThunk());
  }, [dispatch, user]);

  return (
    <div className={styles.container}>
      <Header />

      <Outlet />

      <Footer />

      <Toast />
    </div>
  );
}

export default Layout;