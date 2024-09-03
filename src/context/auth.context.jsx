import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../lib/crud";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const nav = useNavigate();

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
    nav("/");
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
