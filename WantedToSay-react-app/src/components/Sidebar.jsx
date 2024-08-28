import "./Sidebar.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function Sidebar({ boolean }) {
  const { user } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(boolean);

  useEffect(() => {
    setIsVisible(boolean);
  }, [boolean]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const items = [
    {
      name: "Home",
      to: "/",
    },

    !user
      ? {
          name: "Sign Up",
          to: "/signup",
        }
      : "",

    !user
      ? {
          name: "Login",
          to: "/login",
        }
      : "",
    user
      ? {
          name: "Profile",
          to: "/profile",
        }
      : "",

    {
      name: "About Us",
      to: "/about",
    },
  ];

  return (
    <div
      className="sidebar"
      style={{ right: isVisible ? "85%" : "99.9%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items
        .filter((x) => x)
        .map((x, index) => (
          <Link key={index} to={x.to} className="links">
            <p>{x.name}</p>
          </Link>
        ))}
    </div>
  );
}
