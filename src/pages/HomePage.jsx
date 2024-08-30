{
  /*import NoteCard from "../components/NoteCard";
import NoteCard from "../components/NoteCard";
import { getMessages } from "../lib/api";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import "../components/NoteCard.css";
import "./HomePage.css";

function HomePage() {
  const [cards, setCards] = useState(null);
  const { isLoggedIn } = useContext(AuthContext); // Use the AuthContext to check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      getMessages()
        .then((dat) => {
          setCards(dat);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="HomePage">
      <h1>WantedToSay</h1>
      <h2>Say it with no worries!!!</h2>
      <div className="cards-container">
        {cards &&
          cards.map((card, index) => <NoteCard data={card} key={index} />)}
      </div>
    </div>
  );
}

export default HomePage;*/
}

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./HomePage.css";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext); // Check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
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
