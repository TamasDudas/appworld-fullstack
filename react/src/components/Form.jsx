import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Form({ isLogin = true }) {
  const initialData = {
    name: "",
    email: "",
    password: "",
    c_password: "",
  };
  const { login, registration } = useAuth();
  const [formData, setFormData] = useState(initialData);

  function handleData(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  //Form adatok feldolgozása
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const authFunction = isLogin ? login : registration;

      const data = {
        email: formData.email,
        password: formData.password,
        ...(!isLogin && {
          name: formData.name,
          c_password: formData.c_password,
        }),
      };

      const result = await authFunction(data);

      if (result.success) {
        console.log(isLogin ? "Sikeres bejelentkezés" : "Sikeres regisztráció");
        setFormData(initialData);
      } else {
        console.log(isLogin ? "Login hiba" : "Regisztrációs hiba");
      }
    } catch (error) {
      console.log("Hiba ", error.response?.data || error.message);
    }
  }
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email:
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="test@example.com"
          value={formData.email}
          onChange={handleData}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password:
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleData}
        />
      </div>

      {!isLogin && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Comfirmation:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="password confirmation"
              name="c_password" // ← JAVÍTVA!
              value={formData.c_password}
              onChange={handleData}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleData}
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
      >
        {isLogin ? "LOGIN" : "REGISTER"}
      </button>
    </form>
  );
}
