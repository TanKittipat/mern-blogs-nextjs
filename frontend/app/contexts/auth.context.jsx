"use client";

import { useEffect, useState, useContext, createContext } from "react";
import { getCookie, setCookie } from "cookies-next";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On first render, check for the cookie and set the user
  useEffect(() => {
    // Try to get the user cookie
    const savedUser = getCookie("user");
    if (savedUser) {
      // If the cookie exists, parse and set the user
      setUser(JSON.parse(savedUser));
    }
  }, []); // This effect runs only on the first render (component mount)

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    // Optionally clear the cookie when the user logs out
    setCookie("user", "", { path: "/", expires: new Date(0) });
  };

  // Whenever the user state changes, update the cookie
  useEffect(() => {
    if (user !== null) {
      setCookie("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), // cookie will expire in 24 hours
      });
    } else {
      // If user is null (logged out), clear the cookie
      setCookie("user", "", { path: "/", expires: new Date(0) });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
