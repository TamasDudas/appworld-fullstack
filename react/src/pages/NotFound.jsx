import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-80 flex-col justify-center items-center gap-5">
      <h3 className="text-2xl">Az oldal nem telálható!</h3>
      <Link className="bg-blue-700 text-white px-4 py-2 rounded-2xl" to="/">
        Vissza a főoldalra
      </Link>
    </div>
  );
}
