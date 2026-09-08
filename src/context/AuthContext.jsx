import React, { useState, useEffect } from "react";
import { getMeAPI } from "../services/authService";
import { AuthContext } from "./authContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mengecek token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          // Ambil data profil terbaru dari backend
          const response = await getMeAPI();
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          // Jika token invalid/expired, bersihkan sesi
          console.error("Sesi tidak valid:", error);
          localStorage.removeItem("access_token");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("access_token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        Memuat data aplikasi...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
