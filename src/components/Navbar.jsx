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
      <div className="button-group">
      {!isLoggedIn && (
        <>
          {pathname !== "/signup" && pathname !== "/login" && (
            <div className="button-group">
            <>
              <Link to="/signup">
                <button className="SignUpBtn">Sign Up</button>
              </Link>
              {pathname !== "/login" && (
                <Link to="/login">
                  <button>Login</button>
                </Link>
              )}
              </>
            </div>
          )}
        </>
      )}
      {isLoggedIn && (
<<<<<<< HEAD
        <div className="navbar-right">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="navbar-avatar"
            />
          ) : (
            <span>Welcome, {user?.name}</span>
          )}
          <button onClick={logOutUser}>Logout</button>
        </div>
      )}
=======
        <>
          <span>Welcome, {user && user.name}</span>
          <button onClick={logOutUser} className="LogoutBtn">Logout</button>
        </>
        )}
      </div>
>>>>>>> origin/messageDetails
    </nav>
  );
}

export default Navbar;
