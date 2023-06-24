import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PATH_LOGIN } from "./Paths";
import { AuthContext } from "../contexts/authContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const now = Math.floor(Date.now() / 1000);
  console.log(now); // Imprime la hora actual en formato Unix
  if (!user) {
    return <Navigate to={PATH_LOGIN} />;
  }

  return children;
};
