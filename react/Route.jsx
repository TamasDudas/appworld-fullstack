import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./src/layouts/MainLayouts";
import Home from "./src/pages/public/Home";
import Login from "./src/pages/public/Login";
import Register from "./src/pages/public/Register";
import ProtectedRoute from "./src/components/ProtectedRoute";
import CreateProduct from "./src/pages/private/CreateProduct";

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
      //Csak bejelentkezett user
      {
        path: "/create-product",
        element: (
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
export default router;
