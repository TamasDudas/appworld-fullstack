import { useState } from "react";

export default function ProductForm() {
  const initialProductData = {
    name: "",
    detail: "",
  };

  const [productData, setProductData] = useState(initialProductData);

  function handleProductData(e) {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
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
    </form>
  );
}
