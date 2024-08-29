import NoteCard from "../components/NoteCard";
import { getMessages } from "../lib/api";
import { useState, useEffect } from "react";
import "../components/NoteCard.css";
import "./HomePage.css"

function HomePage() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    getMessages().then((dat) => {
      setCards(dat);
    }).catch((error) => {
      console.error("Error fetching messages:", error);
    });
  }, []);
  

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

export default HomePage;
