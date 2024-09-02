import NoteCard from "./NoteCard";

export default function MessageComponent({ display }) {
  return (
    <div className="cards-container">
      {display && display.length > 0 ? (
        display.map((msg, index) => <NoteCard data={msg} key={index} />)
      ) : (
        <p>No messages available.</p>
      )}
    </div>
  );
}
