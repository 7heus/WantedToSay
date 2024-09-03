import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./HomePage.css";

function HomePage({ setVerifying }) {
  const { isLoggedIn } = useContext(AuthContext); // Check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    setVerifying(true);
    if (isLoggedIn) {
      navigate("/messages"); // Redirect to messages page if logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="HomePage">
      <h1>Welcome to WantedToSay</h1>
      <h2>Say it with no worries!</h2>
      {/* Additional content for HomePage */}
    </div>
  );
}

export default HomePage;
