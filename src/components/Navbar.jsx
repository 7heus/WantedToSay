import "./Navbar.css";
import { Link, useAsyncError, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import React from "react";
import { AuthContext } from "../context/auth.context";
function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;



  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const themes = ["dark", "light", "cream", "purple", "yellow", "red"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  

  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      <div className="button-group">

      <button className={`themeBtn ${theme}`}
          onClick={toggleTheme}><svg width="25" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 4.41 0 8-3.59 8-8 0-4.41-3.59-8-8-8zm0 14.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 1.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9-5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg></button>
        
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
          <span className="Welcome">Welcome, {user && user.name}</span>
          <button onClick={logOutUser} className="LogoutBtn">Logout</button>
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
