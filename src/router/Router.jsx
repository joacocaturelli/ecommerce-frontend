import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDetailPage from "../pages/ProductsDetailPage/ProductDetailPage";
import Layout from "../components/Layout/Layout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/productos",
        element: <ProductsPage />,
      },
      {
        path: "/productos/:productId",
        element: <ProductDetailPage />,
      },
    ],
  },
])


function Router() {
  return <RouterProvider router={router} />
}

export default Router