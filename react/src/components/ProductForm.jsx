import { useState, useEffect } from "react";
import { useProduct } from "../context/ProductContext";

export default function ProductForm({ productId }) {
  const {
    createProduct,
    updateProduct,
    product,
    loading,
    success,
    successMessage,
    error,
    clearSuccess,
  } = useProduct();

  const [productData, setProductData] = useState({
    name: "",
    detail: "",
  });

  // Ha van productId és a context-ben van a megfelelő termék, betöltjük
  useEffect(() => {
    if (productId && product && product.id === parseInt(productId)) {
      setProductData({
        name: product.name || "",
        detail: product.detail || "",
      });
    }
  }, [productId, product]);

  // Success üzenet automatikus eltüntetése 3 másodperc után

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, clearSuccess]);

  function handleProductData(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    await (productId
      ? updateProduct(productId, productData)
      : createProduct(productData));

    // Success automatikusan context state-ben lesz!
    // Create mód - form nullázása ha nincs productId
    if (!productId) {
      setProductData({ name: "", detail: "" });
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        {productId ? "Termék frissítése..." : "Termék létrehozása..."}
      </div>
    );
  }

  return (
    <div>
      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Termék neve</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleProductData}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error.name}</p>}
        </div>

        <div>
          <label htmlFor="detail">Termék leírása</label>
          <input
            type="text"
            id="detail"
            name="detail"
            value={productData.detail}
            onChange={handleProductData}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error.detail}</p>}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
          type="submit"
        >
          {productId ? "Termék frissítése" : "Termék létrehozása"}
        </button>
      </form>
    </div>
  );
}
