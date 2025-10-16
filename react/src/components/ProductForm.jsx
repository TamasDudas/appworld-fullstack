import { useState } from "react";
import api from "../api";

export default function ProductForm() {
  const initialProductData = {
    name: "",
    detail: "",
  };

  const [productData, setProductData] = useState(initialProductData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleProductData(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const sendData = {
        name: productData.name,
        detail: productData.detail,
      };
      const createProductResponse = await api.post("/api/products", sendData);
      console.log(createProductResponse.data.data.name);
      setProductData(initialProductData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error?.createProductResponse?.data.data.name ||
          "Sikertelen termék regisztrálás",
      };
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">Termékek hozzáadása folyamatban...</div>
    );
  }
  if (error) {
    return <div className="text-center py-8 text-red-700">{error}</div>;
  }
  return (
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
      </div>
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
        type="submit"
      >
        Küldés
      </button>
    </form>
  );
}
