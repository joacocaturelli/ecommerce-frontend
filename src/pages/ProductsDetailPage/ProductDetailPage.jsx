import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProduct } from "../../hooks/useProduct";
import { addProductThunk } from "../../store/features/cartSlice.js";
import {
  addToWishlistThunk,
  removeFromWishlistThunk
} from "../../store/features/wishlistSlice";
import Button from "../../components/Button/Button";
import ButtonBack from "../../components/ButtonBack/ButtonBack.jsx";
import ReviewList from "../../components/ReviewList/ReviewList";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();

  const {
    product,
    loading,
    error
  } = useProduct(productId);

  const [quantity, setQuantity] = useState(1);

  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.wishlist);

  const isInWish = items.some(
    (item) => String(item.id) === String(productId)
  );

  function handleDecrease() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function handleIncrease() {
    setQuantity((current) =>
      Math.min(product.stock, current + 1)
    );
  }

  function handleAddToCart() {
    dispatch(
      addProductThunk({
        productId,
        quantity
      })
    );
  }

  function handleAddToWish() {
    dispatch(addToWishlistThunk(productId));
  }

  function handleRemoveFromWish() {
    dispatch(removeFromWishlistThunk(productId));
  }

  function handleNavigate() {
    navigate("/login");
  }

  if (loading) {
    return (
      <main className="page">
        <div className="container">
          <StatusMessage
            title="Cargando producto..."
            description="Esperando respuesta del backend..."
          />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="container">
          <StatusMessage
            title="Ha ocurrido un error"
            description={error}
            variant="error"
          />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page">
        <div className="container">
          <StatusMessage
            title="Producto no encontrado..."
            description="Prueba buscando algún otro producto"
          />
        </div>
      </main>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="page">
      <div className="container">

        <ButtonBack className={styles.btnBack} />

        <div className={styles.productContent}>

          <div className={styles.imageContainer}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
            />
          </div>

          <div className={styles.infoProduct}>

            <div className={styles.productHeader}>
              <p className={styles.label}>
                Detalle
              </p>

              <p
                className={
                  isOutOfStock
                    ? styles.stockNo
                    : styles.stockOk
                }
              >
                {isOutOfStock
                  ? "Sin stock"
                  : "En stock"}
              </p>
            </div>

            <h1 className={styles.title}>
              {product.name}
            </h1>

            <p className={styles.description}>
              {product.description}
            </p>

            <p className={styles.price}>
              {product.price}€
            </p>

            <div className={styles.infoCart}>

              <div className={styles.counter}>

                <button
                  type="button"
                  className={styles.btnCart}
                  onClick={handleDecrease}
                  disabled={
                    quantity <= 1 ||
                    isOutOfStock
                  }
                  aria-label="Reducir cantidad"
                >
                  −
                </button>

                <span
                  className={styles.quantity}
                  aria-label={`Cantidad: ${quantity}`}
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  className={styles.btnCart}
                  onClick={handleIncrease}
                  disabled={
                    isOutOfStock ||
                    quantity >= product.stock
                  }
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>

              </div>

              <div className={styles.btnCartContainer}>

                <Button
                  onClick={
                    user
                      ? handleAddToCart
                      : handleNavigate
                  }
                  disabled={isOutOfStock}
                >
                  Añadir al carrito
                </Button>

                <Button
                  onClick={
                    !user
                      ? handleNavigate
                      : isInWish
                        ? handleRemoveFromWish
                        : handleAddToWish
                  }
                  variant={
                    isInWish
                      ? "adminDanger"
                      : "common"
                  }
                >
                  {isInWish
                    ? "Eliminar de la wishlist"
                    : "Añadir a la wishlist"}
                </Button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <ReviewList
        productId={productId}
        user={user}
      />

    </main>
  );
}

export default ProductDetailPage;
