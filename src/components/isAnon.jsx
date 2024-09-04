// Display "Loading..." if authentication status is being determined
// Redirect to the home page if the user is logged in
// Render the children if the user is not logged in



import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  console.log("IsAnon Component - isLoggedIn:", isLoggedIn);
  console.log("IsAnon Component - isLoading:", isLoading);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page
    return <Navigate to="/" />;
  } else {
    // If the user is not logged in, allow to see the page
    return children;
    //}
  }
}

export default IsAnon;
