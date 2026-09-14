import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import Button from "../Button/Button";
import styles from "./ProductForm.module.css";

function ProductForm({ product }) {
  const navigate = useNavigate();

  const { createProduct, updateProduct } = useProducts();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const nameInputRef = useRef(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setStock(product.stock);
      setDescription(product.description ?? "");
      setPrice(product.price);
    }
  }, [product]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      console.log("La imagen no puede ser mayor a 5MB");
      return;
    }

    setImageFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);

      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div className={styles.fields}>

        <label className={styles.field}>
          <span className={styles.label}>
            Nombre del producto
          </span>

          <input
            className={styles.input}
            ref={nameInputRef}
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={loading}
            required
          />
        </label>

        <label className={`${styles.field} ${styles.descriptionField}`}>
          <span className={styles.label}>
            Descripción del producto
          </span>

          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            disabled={loading}
            rows="5"
          />
        </label>

        <div className={styles.row}>

          <label className={styles.field}>
            <span className={styles.label}>
              Precio
            </span>

            <input
              className={styles.input}
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              disabled={loading}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>
              Stock
            </span>

            <input
              className={styles.input}
              name="stock"
              type="number"
              min="0"
              step="1"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              disabled={loading}
              required
            />
          </label>

        </div>

        <label className={styles.field}>
          <span className={styles.label}>
            Imagen del producto
          </span>

          {product?.imageUrl && (
            <span className={styles.currentImage}>
              Este producto ya tiene una imagen. Selecciona otra
              solamente si quieres reemplazarla.
            </span>
          )}

          <input
            className={styles.fileInput}
            name="imageUrl"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />

          {imageFile && (
            <span className={styles.selectedFile}>
              Imagen seleccionada: {imageFile.name}
            </span>
          )}
        </label>

      </div>

      <div className={styles.actions}>
        <Button
          type="submit"
          size="small"
          disabled={loading}
        >
          {loading
            ? "Guardando..."
            : product
              ? "Actualizar producto"
              : "Crear producto"
          }
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;