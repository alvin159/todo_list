import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Todo App
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Todo
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/settings" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/settings">
                  Settings
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/info" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/info">
                  Info
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);

/*this code was referenced from https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/*/