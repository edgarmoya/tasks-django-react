import { Route, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import Paths from "./Paths";

export default function PrivateRoute() {
  let { user } = useContext(AuthContext);
  return <>{user ? <Outlet /> : <Navigate to={Paths.LOGIN} />}</>;
}
