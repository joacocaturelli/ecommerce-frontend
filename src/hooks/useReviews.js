import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiError } from "../utils/apiError";
import { showError } from "../store/features/toastSlice";
import * as apiReview from "../api/reviews";

export function useReviews(productId) {
  const dispatch = useDispatch();

  const [reviews, setReviews] = useState([]);
  const [revLoading, setRevLoading] = useState(false);
  const [revError, setRevError] = useState(null);

  // Obtiene las reviews y actualiza el estado.
  // No gestiona loading ni errores para poder reutilizarla
  // después de crear, editar o eliminar una review.
  async function fetchReviews() {
    const data = await apiReview.getReviewsByProductId(productId);
    setReviews(data);
  }

  async function loadReviews() {
    try {
      setRevLoading(true);
      setRevError(null);

      await fetchReviews();
    } catch (error) {
      const apiError = getApiError(error);

      setRevError(apiError);
      dispatch(showError(apiError.message));
    } finally {
      setRevLoading(false);
    }
  }

  // No hace falta pasar productId en cada funcion porque
  // el hook ya lo conoce de manera global
  async function createReview(rating, comment) {
    try {
      setRevLoading(true);
      setRevError(null);

      await apiReview.createReview(productId, rating, comment);
      await fetchReviews();
    } catch (error) {
      const apiError = getApiError(error);

      setRevError(apiError);
      dispatch(showError(apiError.message));
    } finally {
      setRevLoading(false);
    }
  }

  async function updateReview(rating, comment) {
    try {
      setRevLoading(true);
      setRevError(null);

      await apiReview.updateReview(productId, rating, comment);
      await fetchReviews();
    } catch (error) {
      const apiError = getApiError(error);

      setRevError(apiError);
      dispatch(showError(apiError.message));
    } finally {
      setRevLoading(false);
    }
  }

  async function deleteReview() {
    try {
      setRevLoading(true);
      setRevError(null);

      await apiReview.deleteReview(productId);
      await fetchReviews();
    } catch (error) {
      const apiError = getApiError(error);

      setRevError(apiError);
      dispatch(showError(apiError.message));
    } finally {
      setRevLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, [productId]);

  return { reviews, revLoading, revError, createReview, updateReview, deleteReview };
}
