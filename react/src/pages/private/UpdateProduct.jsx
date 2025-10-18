import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useProduct } from "../../context/ProductContext";

export default function UpdateProduct() {
  const { id } = useParams();
  const { fetchProduct } = useProduct();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Termék szerkesztése
        </h1>
        <ProductForm productId={id} />
      </div>
    </div>
  );
}
