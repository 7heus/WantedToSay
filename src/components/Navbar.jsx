{
  /*import "./Navbar.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      {!isLoggedIn && (
        <>
          {pathname !== "/signup" && pathname !== "/login" && (
            <>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              {pathname !== "/login" && (
                <Link to="/login">
                  <button>Login</button>
                </Link>
              )}
            </>
          )}
        </>
      )}
      {isLoggedIn && (
        <>
          {user && user.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="navbar-avatar"
            />
          ) : (
            <span>No Avatar</span>
          )}
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
    </nav>
  );
}
export default Navbar;  */
}

import React, { useState, useContext, useEffect } from "react"; // Ensure useState and useEffect are imported
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  // Add the useState hook to manage the dropdown's open/close state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !event.target.closest(".navbar-avatar") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSettingsClick = () => {
    navigate("/profile");
  };

  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
      {isLoggedIn && user && (
        <div className="navbar-right">
          <div className="avatar-container" onClick={toggleDropdown}>
            {user && user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="navbar-avatar"
              />
            ) : (
              <span>No Avatar</span>
            )}
          </div>

          {/* Dropdown Menu */}
          <div
            className={
              dropdownOpen
                ? "dropdown-menu dropdown-open"
                : "dropdown-menu dropdown-hidden"
            }
          >
            {user && user.avatar && (
              <div className="dropdown-avatar">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="dropdown-avatar-img"
                />
              </div>
            )}
            <p className="dropdown-greeting">Hi, {user.name}!</p>
            <div className="dropdown-actions">
              <div className="action-box">
                <button onClick={handleSettingsClick}>
                  <span className="emoji">⚙️</span> Settings
                </button>
              </div>
              <div className="action-box">
                <button onClick={logOutUser}>
                  <span className="emoji">➡️</span> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
