import { useEffect, useState } from "react";
import { getReviewsByProductId } from "../api/reviews";

export function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        setError(null);
        const data = await getReviewsByProductId(productId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [productId]);

  return { reviews, loading, error };
}
