import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
<<<<<<< HEAD
function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
=======

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

>>>>>>> FrontEndDeveloping
  return (
    <nav className="Navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
<<<<<<< HEAD
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button className="SignUp">Sign Up</button>
=======

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
>>>>>>> FrontEndDeveloping
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
<<<<<<< HEAD
    </nav>
  );
}
export default Navbar;
=======
      {isLoggedIn && (
        <>
          <span>Welcome, {user && user.username}</span>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
>>>>>>> FrontEndDeveloping
