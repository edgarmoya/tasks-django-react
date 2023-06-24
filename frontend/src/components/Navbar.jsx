import React, { useContext } from "react";
import logo from "../images/react-icon.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-light fixed-top bg-body-tertiary">
        <div className="container">
          <Link to={"/tasks"} className="navbar-brand" href="/">
            <img src={logo} height={32} width={32} alt="Logo"></img>
            <span className="fw-bold ms-2">Tasks</span>
            <span className="fw-light">App</span>
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Actions
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/tasks-create"}>
                    Create task
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
