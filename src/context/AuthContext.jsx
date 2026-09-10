import React, { useState, useEffect } from "react";
import { getMeAPI } from "../services/authService";
import { AuthContext } from "./authContextValue";

export const AuthProvider = ({ children }) => {
  // Baca cache user dari localStorage agar langsung tersedia tanpa nunggu API
  const cachedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user_data")); } catch { return null; }
  })();

  const [user, setUser] = useState(cachedUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access_token"));
  const [isLoading, setIsLoading] = useState(!cachedUser && !!localStorage.getItem("access_token"));

  // Mengecek token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      // Jika sudah ada cache, tidak perlu tampilkan loading — validasi di background
      try {
        const response = await getMeAPI();
        const userData = response.data;
        localStorage.setItem("user_data", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        // Jika token invalid/expired, bersihkan sesi
        console.error("Sesi tidak valid:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
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
