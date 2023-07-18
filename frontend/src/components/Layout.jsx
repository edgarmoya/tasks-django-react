import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <main className="container mx-auto">
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default Layout;
