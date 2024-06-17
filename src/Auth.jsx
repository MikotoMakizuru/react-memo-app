import React from "react";
import { useAuth } from "./AuthContext";

const Auth = () => {
  const { auth } = useAuth();

  return (
    <button type="button" onClick={auth.isLogin ? auth.logout : auth.login}>
      {auth.isLogin ? "ログアウト" : "ログイン"}
    </button>
  );
};

export default Auth;
