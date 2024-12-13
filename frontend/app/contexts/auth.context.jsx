"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { getCookie, setCookie } from "cookies-next";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if it's a client-side environment before accessing cookies
  useEffect(() => {
    const savedUser = getCookie("user") || null;
    setUser(savedUser);
  }, []); // Only run once after initial mount

  const login = (user) => setUser(user);
  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    if (user !== null) {
      // Only set the cookie if the user is defined
      setCookie("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), // 1 day expiration
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
