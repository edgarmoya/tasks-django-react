import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Paths from "./Paths";
import { AuthContext } from "../contexts/authContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={Paths.LOGIN} />;
  }

  return children;
};
