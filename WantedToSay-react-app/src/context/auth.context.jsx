import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
<<<<<<< HEAD
const AuthContext = createContext();
=======

const AuthContext = createContext();

>>>>>>> FrontEndDeveloping
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
<<<<<<< HEAD
=======

>>>>>>> FrontEndDeveloping
  // functions to update the state
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
<<<<<<< HEAD
  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
=======

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

>>>>>>> FrontEndDeveloping
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      authService
        .verify()
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;
<<<<<<< HEAD
=======

>>>>>>> FrontEndDeveloping
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
<<<<<<< HEAD
  const removeToken = (token) => {
    localStorage.removeItem("authToken");
  };
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };
  useEffect(() => {
    authenticateUser();
  }, []);
=======

  const removeToken = (token) => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();

    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

>>>>>>> FrontEndDeveloping
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
<<<<<<< HEAD
export { AuthContext, AuthProviderWrapper };
=======

export { AuthContext, AuthProviderWrapper };
>>>>>>> FrontEndDeveloping
