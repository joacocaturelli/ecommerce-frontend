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
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccessPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import AdminProductPage from "../pages/AdminProductPage/AdminProductPage";
import AdminProductFormPage from "../pages/AdminProductFormPage/AdminProductFormPage";
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
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:productId",
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
        path: "/order/:orderId/success",
        element: 
        <PrivateRoute>
          <OrderSuccessPage />,
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
      {
        path: "/admin/products",
        element: 
        <PrivateRoute requiredRole={'ADMIN'}>
          <AdminProductPage />,
        </PrivateRoute>
      },
      {
        path: "/admin/products/form",
        element: 
        <PrivateRoute requiredRole={'ADMIN'}>
          <AdminProductFormPage />,
        </PrivateRoute>
      },
      {
        path: "/admin/products/form/:productId",
        element: 
        <PrivateRoute requiredRole={'ADMIN'}>
          <AdminProductFormPage />,
        </PrivateRoute>
      },
    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router