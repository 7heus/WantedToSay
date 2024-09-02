import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    authenticateUser(); // Verify token immediately after storing
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify(storedToken) // Pass the token to the verify method
        .then((response) => {
          setIsLoggedIn(true);
          setUser(response.data);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUser(null);
        })
        .finally(() => setIsLoading(false)); // Set loading to false when done
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser(); // Update state after logging out
  };

  useEffect(() => {
    authenticateUser();
  }, []);

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

export { AuthContext, AuthProviderWrapper };
