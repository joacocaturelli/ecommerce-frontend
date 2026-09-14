export function getApiError(error) {
  return {
    status: error.response?.status,
    message: error.response?.data?.error || "Ha ocurrido un error inesperado",
  };
}
