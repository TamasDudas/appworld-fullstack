import React from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
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
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Belépés
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/register"
          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Regisztráció
        </Link>
      </div>
    </nav>
  );
}
