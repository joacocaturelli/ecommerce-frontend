import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import ProductForm from "../../components/ProductForm/ProductForm";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import styles from "./AdminProductFormPage.module.css";

function AdminProductFormPage() {
  const { productId } = useParams();

  // Si venimos desde Crear Producto, productId será undefined.
  // En ese caso useProduct no realiza ninguna petición
  // y product será null.
  const { product, loading, error } = useProduct(productId);

  const isEditing = Boolean(productId);

  return (
    <main className="page">
      <section className={styles.pageContainer}>
        <ButtonBack />

        <header className={styles.header}>
          <p className={styles.eyebrow}>
            Administración / Productos
          </p>

          <h1>
            {isEditing ? "Editar producto" : "Crear producto"}
          </h1>

          <p className={styles.description}>
            {isEditing
              ? "Modifica la información del producto y guarda los cambios."
              : "Añade un nuevo producto a la colección de la tienda."}
          </p>
        </header>

        {loading && (
          <StatusMessage
            title="Cargando producto..."
            description="Esperando respuesta del backend..."
          />
        )}

        {error && (
          <StatusMessage
            title="Ha ocurrido un error"
            description={error.message}
            variant="error"
          />
        )}

        {!loading && !error && (
          <div className={styles.formContainer}>
            <ProductForm product={product} />
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminProductFormPage;