import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./src/layouts/MainLayouts";
import Home from "./src/pages/public/Home";
import Login from "./src/pages/public/Login";
import Register from "./src/pages/public/Register";
import ProtectedRoute from "./src/components/ProtectedRoute";
import CreateProduct from "./src/pages/private/CreateProduct";
import Product from "./src/pages/public/Product";
import UpdateProduct from "./src/pages/private/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // Nincs bejelentkezve a felhasználó
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      //Csak bejelentkezett user
      {
        path: "/create-product",
        element: (
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-product/:id",
        element: (
          <ProtectedRoute>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
