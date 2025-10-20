import { createContext, useContext, useState } from "react";
import api from "../api";

const ProductContext = createContext({
  product: null,
  error: null,
  success: null,
  successMessage: "",
  loading: false,
  createProduct: async () => {},
  updateProduct: async () => {},
  fetchProduct: async () => {},
  deleteProduct: async () => {},
  clearSuccess: () => {},
});

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/product/${id}`);
      const productData = response.data.data;
      setProduct(productData);

      return { success: true, data: productData };
    } catch (error) {
      setError("hiba történt a termék betöltésekor");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/products", productData);
      const newProduct = response.data.data;
      setProduct(newProduct);
      setSuccess(response.data.success);
      setSuccessMessage(response.data.message);
      return { data: newProduct };
    } catch (error) {
      const errorResponse = error?.response?.data?.data;
      setError(errorResponse);
      return { success: false, error: errorResponse };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.patch(`/api/products/${id}`, productData);
      const updatedProduct = response.data.data;
      setProduct(updatedProduct);
      setSuccess(response.data.success);
      setSuccessMessage(response.data.message);
      return { data: updatedProduct };
    } catch (error) {
      const errorUpdate = error?.response?.data?.data;
      setError(errorUpdate);
      return { success: false, error: errorUpdate };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/products/${id}`);
      setSuccess("A termék sikeresen törölve");
    } catch (error) {
      setError("A termék törlése nem sikerült");
    } finally {
      setLoading(false);
    }
  };

  const clearSuccess = () => {
    setSuccess(null);
    setSuccessMessage("");
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        error,
        loading,
        success,
        successMessage,
        createProduct,
        updateProduct,
        fetchProduct,
        deleteProduct,
        clearSuccess,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
