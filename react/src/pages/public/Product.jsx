import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";

export default function Product() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const { product, error, loading, fetchProduct } = useProduct();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Termékek betöltése...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-700">{error}</div>;
  }
  if (!product) {
    return <div className="text-center py-8">Termék nem található</div>;
  }
  return (
    <div className="max-w-6xl mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-6 ">{product.name}</h2>
      <p>{product.detail}</p>
      <p>id: {product.id}</p>
      {isAuthenticated && (
        <Link to={`/update-product/${product.id}`}>Termék szerkesztése</Link>
      )}
    </div>
  );
}
