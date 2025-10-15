import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateNavbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="max-w-4xl mx-auto p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        Appworld Fullstack
      </Link>

      {/* Nav links */}
      <div className="flex items-center space-x-4">
        <Link
          to="/create-product"
          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Termék létrehozása
        </Link>
      </div>

      {/* user info */}
      <div className="flex items-center space-x-4 py-1">
        <span>Hello, {user?.name}!</span>
        <button
          onClick={handleLogout}
          className="px-2 py-1 text-white bg-red-700 hover:bg-red-900 rounded-md"
        >
          Kilépés
        </button>
      </div>
    </nav>
  );
}
