import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import router from "../Route.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
