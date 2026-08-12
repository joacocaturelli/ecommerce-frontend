import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import HomePage from "../pages/HomePage/HomePage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProductDetailPage from "../pages/ProductsDetailPage/ProductDetailPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CartPage from "../pages/CartPage/CartPage";
import WishlistPage from "../pages/WishlistPage/WishlistPage";
import AllOrdersPage from "../pages/AllOrdersPage/AllOrdersPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AdminPage from "../pages/AdminPage/AdminPage";

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
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/orders",
        element: <AllOrdersPage />,
      },
      {
        path: "/order/:orderId",
        element: <OrderPage />,
      },
      {
        path: "/admin",
        element: 
        <PrivateRoute requiredRole={'ADMIN'}>
          <AdminPage />,
        </PrivateRoute>
      },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router