import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function Product() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleProduct();
  }, [id]);

  const handleProduct = async () => {
    try {
      const getProduct = await api.get(`/api/product/${id}`);
      const response = getProduct.data.data;
      setProduct(response);
      setLoading(false);
    } catch (error) {
      setError("Hibatörtént a termékek betöltésekor");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Termékek betöltése...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-700">{error}</div>;
  }
  return (
    <div className="max-w-6xl mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-6 ">{product.name}</h2>
      <p>{product.detail}</p>
      <p>id: {product.id}</p>
      {isAuthenticated && <Link to="/update-product">Termék szerkesztése</Link>}
    </div>
  );
}
