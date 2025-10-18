import { createContext, useContext, useState } from "react";
import api from "../api";

const ProductContext = createContext({
  product: null,
  error: null,
  loading: false,
  createProduct: async () => {},
  updateProduct: async () => {},
  fetchProduct: async () => {},
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
      return { success: true, data: newProduct };
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
      return { success: true, data: updatedProduct };
    } catch (error) {
      const errorUpdate = error?.response?.data?.data;
      setError(errorUpdate);
      return { success: false, error: errorUpdate };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        error,
        loading,
        createProduct,
        updateProduct,
        fetchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
