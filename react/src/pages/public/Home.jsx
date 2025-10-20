import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleProducts();
  }, []);

  const handleProducts = async () => {
    try {
      const response = await api.get("/api/products");
      const responseData = response.data.data;
      setProducts(responseData);
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
    <div className="max-w-6xl mx-auto mt-8">
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
