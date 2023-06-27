import React, { useContext, useState } from "react";
import logo from "../images/react-icon.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import IconsNavbar from "../images/IconsNavbar";

function Navbar({ onSearch, onClear, onCreate }) {
  const { logout } = useContext(AuthContext);
  const [valueSearch, setSearchValue] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setIsSearchActive(value !== "");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(valueSearch);
  };

  const clearSearch = () => {
    setSearchValue("");
    setIsSearchActive(false);
    onClear();
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg bg-light fixed-top bg-body-tertiary nav-opacity">
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
                  <div className="dropdown-item" onClick={onCreate}>
                    <IconsNavbar.Create className="text-primary me-2" /> Create
                    task
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    <IconsNavbar.Logout className="text-primary me-2" /> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="text"
                value={valueSearch}
                onChange={handleSearchChange}
                className="form-control"
                placeholder="Search tasks..."
              />
              {isSearchActive && (
                <button className="btn btn-block" onClick={clearSearch}>
                  <i className="btn btn-close text-bg-light"></i>
                </button>
              )}
            </div>
            <button className="btn btn-primary ms-2" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
