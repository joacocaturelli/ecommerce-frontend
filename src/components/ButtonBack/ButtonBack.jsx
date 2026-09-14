import { useNavigate } from "react-router-dom";
import styles from "./ButtonBack.module.css";

function ButtonBack({
  children = "Volver atrás",
  className = "",
}) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      onClick={() => navigate(-1)}
    >
      <span aria-hidden="true">←</span>
      {children}
    </button>
  );
}

export default ButtonBack;