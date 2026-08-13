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
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

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
        element: 
        <PrivateRoute>
          <CartPage />,
        </PrivateRoute>
      },
      {
        path: "/wishlist",
        element: 
        <PrivateRoute>
          <WishlistPage />,
        </PrivateRoute>
      },
      {
        path: "/orders",
        element: 
        <PrivateRoute>
          <AllOrdersPage />,
        </PrivateRoute>
      },
      {
        path: "/order/:orderId",
        element: 
        <PrivateRoute>
          <OrderPage />,
        </PrivateRoute>
      },
      {
        path: "/profile",
        element: 
        <PrivateRoute>
          <ProfilePage />,
        </PrivateRoute>
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