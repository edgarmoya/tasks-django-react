import React from "react";
import LogoutIcon from "./right-from-bracket-solid.svg";
import CreateIcon from "./square-plus-solid.svg";

export function Create({ className }) {
  return (
    <img
      src={CreateIcon}
      alt="Create"
      style={{ height: "16px", width: "16px" }}
      className={className}
    />
  );
}

export function Logout({ className }) {
  return (
    <img
      src={LogoutIcon}
      alt="Logout"
      style={{ height: "16px", width: "16px" }}
      className={className}
    />
  );
}

// Exporta los iconos como una sola exportación predeterminada
const IconsNavbar = {
  Create,
  Logout,
};

export default IconsNavbar;
