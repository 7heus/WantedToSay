import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";

export default function MessageComponent({ display }) {
  const [component, setComponent] = useState(null);
  useEffect(() => setComponent(display), [display]);
  return (
    <div className="cards-container">
      {component && component.length > 0 ? (
        component.map((msg, index) => <NoteCard data={msg} key={index} />)
      ) : (
        <p>No messages available.</p>
      )}
    </div>
  );
}
