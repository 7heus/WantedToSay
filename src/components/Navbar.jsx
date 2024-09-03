import "./Navbar.css";
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
export default Navbar;
