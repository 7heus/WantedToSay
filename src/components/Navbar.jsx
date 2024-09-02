import "./Navbar.css";
import { Link, useAsyncError, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
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
          onClick={toggleTheme}>Theme</button>
        
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
        <>
          <span>Welcome, {user && user.name}</span>
          <button onClick={logOutUser} className="LogoutBtn">Logout</button>
        </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
