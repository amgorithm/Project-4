import React from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { user } = useUser();

  let nav = user ? (
    <div className="navbar-logged-in">
      {/* <NavLink to="/search" className="NavBar-link">
        Search
      </NavLink> */}

      {/* <NavLink to="/inventory" className="NavBar-link">
        Inventory
      </NavLink> */}

      <NavLink
        to="/dashboard"
        className="dashboard"
        style={{ textDecoration: "none" }}
      >
        Dashboard
      </NavLink>
      <NavLink to="/profile">
        {/* <span className="NavBar-welcome">{user}</span> */}
        <img
          src={require("../../images/user.png")}
          alt="profile avatar"
          className="profile-avatar"
        />
      </NavLink>
    </div>
  ) : (
    <div className="navbar-anon-user">
      <NavLink
        to="/login"
        className="navbar-login-link"
        style={{ textDecoration: "none" }}
      >
        LOG IN
      </NavLink>
      <NavLink
        to="/signup"
        className="navbar-signup-link"
        style={{ textDecoration: "none" }}
      >
        SIGN UP
      </NavLink>
    </div>
  );

  return (
    <div className="NavBar">
      <div className="waste-not-title">
        <Link to="/" style={{ textDecoration: "none", color: " #2d3b1d" }}>
          <h1>Waste Not</h1>
        </Link>
      </div>
      {nav}
    </div>
  );
};

export default NavBar;
