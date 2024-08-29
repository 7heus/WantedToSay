import "./Navbar.css";
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
          <span>Welcome, {user && user.name}</span>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
