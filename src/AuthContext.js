import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  const auth = {
    isLogin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
