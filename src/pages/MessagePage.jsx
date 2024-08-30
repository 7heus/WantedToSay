import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import messageService from "../services/auth.message.service";
import NoteCard from "../components/NoteCard";
import "./MessagePage.css";

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      messageService
        .getMessages()
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          setErrorMessage("Failed to load messages.");
        });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="MessagePage">
      <h1>Messages</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="cards-container">
        {messages.length > 0 ? (
          messages.map((msg, index) => <NoteCard data={msg} key={index} />)
        ) : (
          <p>No messages available.</p>
        )}
      </div>

      <button onClick={() => navigate("/new-message")} className="SendNewMessageBtn">Send New Message</button>
    </div>
  );
}

export default MessagePage;
