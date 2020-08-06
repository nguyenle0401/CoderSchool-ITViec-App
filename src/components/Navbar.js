import React from "react";
import { NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  let dispatch = useDispatch()

  const signOut = () => {
    dispatch({type: "SIGN_OUT"})
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark position-fixed style-nav">
        <NavLink className="navbar-brand" to="/#">
          <img
            class="logo-itviec"
            alt="itviec"
            src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
            width="108"
            height="42"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink className="nav-link style-color-nav" to="/#">
                All jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link style-color-nav" to="/#">
                Employers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link style-color-nav" to="/#">
                IT Companies
              </NavLink>
            </li>
          </ul>
          {isAuthenticated ? (
            <NavLink onClick = {() => signOut()}
              className="btn btn-outline-danger my-2 my-sm-0"
              to="/login"
            >
              Sign Out
            </NavLink>
          ) : (
            " "
          )}
        </div>
      </nav>
    </div>
  );
}
