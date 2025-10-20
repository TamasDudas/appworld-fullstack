import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

export default function Home() {
  const {
    fetchProducts,
    loading,
    error,
    products,
    success,
    clearSuccess,
    successMessage,
  } = useProduct();

  // Success üzenet automatikus eltüntetése 5 másodperc után
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearSuccess();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, clearSuccess]);

  useEffect(() => {
    fetchProducts();
  }, []);

  ///

  if (loading) {
    return <div className="text-center py-8">Termékek betöltése...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-700">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {success && (
        <div className="mb-4 bg-green-500 border text-neutral-100 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">Termékeink</h2>
      {products.length === 0 ? (
        <div>Jelenleg nincs termékünk</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              className="bg-white  rounded-lg shadow-md p-6"
              key={product.id}
            >
              <h2>{product.name}</h2>
              <div className="my-6">
                <p>{product.detail}</p>
              </div>
              <div>
                <Link
                  className="py-2 px-4 bg-amber-300 mt-5 rounded-xl"
                  to={`/product/${product.id}`}
                >
                  Részletek
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
