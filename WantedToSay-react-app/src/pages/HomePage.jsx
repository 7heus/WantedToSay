import NoteCard from "../components/NoteCard";
import { getMessages } from "../lib/api";
import { useState, useEffect } from "react";

function HomePage() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    getMessages().then((dat) => setCards(dat));
  }, []);

  return (
    <div>
      <h1>WantedToSay</h1>
      <h2>Say it with no worries!!!</h2>
      {cards &&
        cards.map((card, index) => <NoteCard data={card} key={index} />)}
    </div>
  );
}

export default HomePage;
