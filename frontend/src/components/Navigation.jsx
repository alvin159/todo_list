import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Todo App</Link>
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            <Link className="nav-link" to="/">Todo</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/settings" ? "active" : ""}`}>
            <Link className="nav-link" to="/settings">Settings</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/info" ? "active" : ""}`}>
            <Link className="nav-link" to="/info">Info</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
