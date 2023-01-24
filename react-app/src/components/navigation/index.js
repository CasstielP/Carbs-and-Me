import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import "./navigation.css";
import logo from "./iconname.png";
import menufill from './menu_FILL.png'
import SideBar from "../sideBar";
import accountCircle from './account_circle.png'
import dots from './more_horiz.png'
import manageAccount from './manage_accounts.png'
import SearchBar from "./searchBar";
import uploadIcon from './video.png'
const NavBar = ({showSideBar, setShowSideBar}) => {
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
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

  const handlesidebar = () => {
    if(showSideBar) {
      setShowSideBar(false)
    } else{
      setShowSideBar(true)
    }
  }

  return (
    <div className="header">
      <div className="nav-left">
        <div onClick={handlesidebar}  id="bar-menu">
      <img className="material-symbols-outlined" src={menufill}/>
        </div>
      {/* <span class="material-symbols-outlined">menu</span> */}

      {/* <NavLink  exact to="/" >
        <img  className="logo" src={logo}></img>
      </NavLink> */}
      <a href="/">
      <img  className="logo" src={logo}></img>
      </a>
      </div>

      <SearchBar />
      <div className="nav-right">
        {user &&
        <>
        <div id='create-vid-wrapper'>
      <img onClick={()=>history.push(`/upload`)} id='uploadIcon' src={uploadIcon}></img>
      <div className="hide">Create</div>
        </div>
        </>
        }
      <div className="wrapper">
        {!user && (
          <button onClick={openMenu} className="pfbutton">
            <div className="nav-icon-holder">
            <img className="nav-icons" src={accountCircle} />
            <span> </span>
            <img className="nav-icons" src={dots} />
            </div>
          </button>
        )}
        {user && (
          <button onClick={openMenu} className="pfbutton">
            {/* <span class="material-symbols-outlined">person</span> */}
            <img id='manage-acct' src={manageAccount} />
          </button>
        )}

        {showMenu && (
          <div className="dropdownMenulogin">
            {!user && (
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                  exact={true}
                  activeClassName="active"
                >
              <div className="loginselect">
                  Login
              </div>
                </NavLink>
            )}
            {!user && (
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/sign-up"
                  exact={true}
                  activeClassName="active"
                >
              <div className="loginselect">
                  Sign Up
              </div>
                </NavLink>
            )}
            {user && (
              <>

                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/users/${user.id}`}
                    exact={true}
                    activeClassName="active"
                  >
                <div className="loginselect">
                    User Profile
                </div>
                  </NavLink>
                  {/* <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/upload"
                    exact={true}
                    activeClassName="active"
                  >
                <div className="loginselect">
                    Upload Video
                </div>
                  </NavLink> */}
              </>
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
    </div>
  );
};

export default NavBar;
