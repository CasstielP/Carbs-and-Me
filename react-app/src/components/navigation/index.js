import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./navigation.css";
import logo from "./iconname.png";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="header">
      <NavLink exact to="/">
        <img className="logo" src={logo}></img>
      </NavLink>

      <div className="wrapper">
        {!user && (
          <button onClick={openMenu} className="pfbutton">
            <span className="material-symbols-outlined">account_circle</span>
            <span> </span>
            <span class="material-symbols-outlined">more_horiz</span>
          </button>
        )}
        {user && (
          <button onClick={openMenu} className="pfbutton">
            <span class="material-symbols-outlined">person</span>
          </button>
        )}

        {showMenu && (
          <div className="dropdownMenulogin">
            {!user && (
              <div className="loginselect">
                <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/login" exact={true} activeClassName="active">
                  Login
                </NavLink>
              </div>
            )}
            {!user && (
              <div className="loginselect">
                <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
                </NavLink>
              </div>
            )}
            {user && (
              <div className="loginselect">
                <NavLink
                style={{ textDecoration: "none", color: "black" }}
                  to={`/users/${user.id}`}
                  exact={true}
                  activeClassName="active"
                >
                  User Profile
                </NavLink>
              </div>
            )}

            {user && (
              <div className="loginselect">
                <LogoutButton />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to="/" exact={true} activeClassName="active">
    //         Home
    //       </NavLink>
    //     </li>
    //    {!user && <li>
    //       <NavLink to="/login" exact={true} activeClassName="active">
    //         Login
    //       </NavLink>
    //     </li>}
    //     {!user && <li>
    //       <NavLink to="/sign-up" exact={true} activeClassName="active">
    //         Sign Up
    //       </NavLink>
    //     </li>}
    //     {user && (
    //       <li>
    //         <NavLink
    //           to={`/users/${user.id}`}
    //           exact={true}
    //           activeClassName="active"
    //         >
    //           User Profile
    //         </NavLink>
    //       </li>
    //     )}

    //     {user && (
    //       <li>
    //         <LogoutButton />
    //       </li>
    //     )}
    //   </ul>
    // </nav>
  );
};

export default NavBar;
