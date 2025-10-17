import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../../components/ProductForm";

export default function UpdateProduct() {
  const { id } = useParams();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Termék szerkesztése
        </h1>
        <ProductForm />
      </div>
    </div>
  );
}
