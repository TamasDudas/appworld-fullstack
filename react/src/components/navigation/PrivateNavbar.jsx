import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
          to="/"
          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Home
        </Link>
      </div>

      {/* user info */}
      <div className="flex items-center space-x-2 border-1 pl-4">
        <span>Hello, {user?.name}!</span>
        <button
          onClick={handleLogout}
          className="p-4 text-white bg-red-700 hover:bg-red-900 rounded-md"
        >
          Kilépés
        </button>
      </div>
    </nav>
  );
}
