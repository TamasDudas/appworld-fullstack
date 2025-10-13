import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const authContext = createContext({
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async () => {},
  registration: async () => {},
  logout: async () => {},
  clearError: () => {},
});

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Local storage ellenörzése
  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/api/user");
      setUser(response.data);
      setIsAuthenticated(true);
      console.log("Bejelentkezett user: ", response.data.name);
    } catch (error) {
      console.log("Nincs aktív user");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  //Login
  const login = async (credentials) => {
    const { email, password } = credentials;

    try {
      await api.post("/api/login", { email, password });

      const userResponse = await api.get("/api/user");
      localStorage.setItem("auth_token", response.data.token);
      setUser(userResponse.data);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.log("Login hiba:", error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || "Sikertelen bejelentkezés",
      };
    }
  };
};
