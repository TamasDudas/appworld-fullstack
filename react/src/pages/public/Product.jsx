import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import ConfirmModal from "../../components/ConfirmModal";

export default function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { product, error, loading, fetchProduct, deleteProduct } = useProduct();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteProduct(id);
    navigate("/");
  };

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
    <div className="max-w-6xl mx-auto mt-8 text-center gap-2">
      <h2 className="text-2xl font-bold mb-6 ">{product.name}</h2>
      <p>{product.detail}</p>
      <p className="my-4">id: {product.id}</p>

      {isAuthenticated && (
        <div>
          <Link
            className="py-2 px-4 mx-4 bg-amber-300 mt-5 rounded-xl"
            to={`/update-product/${product.id}`}
          >
            Termék szerkesztése
          </Link>

          <button
            className="py-2 px-4 bg-red-700 mt-5 rounded-xl cursor-pointer text-white"
            onClick={() => setShowModal(true)}
          >
            Törlés
          </button>

          {showModal && (
            <div>
              <ConfirmModal
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
                message="Biztos törölni akarod a terméket?"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
