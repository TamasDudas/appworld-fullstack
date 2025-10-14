import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext({
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
  const context = useContext(AuthContext);

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
      const loginResponse = await api.post("/api/login", { email, password });

      localStorage.setItem("auth_token", loginResponse.data.data.token);

      const userResponse = await api.get("/api/user");
      console.log(userResponse);
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

  const registration = async (credentials) => {
    const { name, email, password, c_password } = credentials;

    try {
      const registerResponse = await api.post("/api/register", {
        name,
        email,
        password,
        c_password,
      });
      localStorage.setItem("auth_token", registerResponse.data.data.token);

      setUser(registerResponse.data.data);
      setIsAuthenticated(true);
      console.log("Sikeres regisztráció: ", registerResponse.data.name);
      return { success: true };
    } catch (error) {
      console.log("Regisztrációs hiba");
      return {
        success: false,
        error: error.response?.data?.name || "Sikertelen resisztrálás",
      };
    }
  };

  //KILÉPÉS
  const logout = async () => {
    try {
      await api.post("/api/logout");
      localStorage.removeItem("auth_token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Kijelentkezési hiba");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        registration,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
