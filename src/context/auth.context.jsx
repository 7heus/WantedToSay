{
  /*import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [uniqueKey, setUniqueKey] = useState("");
  // functions to update the state
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      authService
        .verify()
        .then((response) => {
          console.log(response);
          // If the server verifies that the JWT token is valid
          const usr = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(usr);
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        uniqueKey,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper }; */
}

import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import { fetchUser } from "../lib/crud";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
    authenticateUser(); // Verify token immediately after storing
  };

  const update = (id) => {
    fetchUser(id).then((data) => {
      setUser(data);
    });
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify(storedToken) // Pass the token to the verify method
        .then((response) => {
          setIsLoggedIn(true);
          fetchUser(response.data._id).then((dat) => setUser(dat));
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
        update,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
