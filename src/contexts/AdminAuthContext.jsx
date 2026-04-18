import { createContext, useContext, useEffect, useState } from "react";
import { authLogin } from "../api/apiClient";

const TOKEN_KEY = "bilge-admin-token";
const USER_KEY = "bilge-admin-user";
const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    if (typeof window === "undefined") return { token: null, user: null };

    const token = window.localStorage.getItem(TOKEN_KEY);
    const user = window.localStorage.getItem(USER_KEY);
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    };
  });

  const isAuthenticated = Boolean(auth?.token);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (auth?.token) {
      window.localStorage.setItem(TOKEN_KEY, auth.token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
    if (auth?.user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
    } else {
      window.localStorage.removeItem(USER_KEY);
    }
  }, [auth]);

  const login = async ({ username, password }) => {
    const response = await authLogin({ username, password });
    if (!response || !response.token) {
      throw new Error("Кирүү учурунда ката чыкты.");
    }
    setAuth({ token: response.token, user: response.user ?? null });
    return response;
  };

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
