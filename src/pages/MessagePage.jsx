import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import messageService from "../services/auth.message.service";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/searchBar";
import "./MessagePage.css";

function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
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
          setFilteredMessages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
          setErrorMessage("Failed to load messages.");
        });
    }
  }, [isLoggedIn, navigate]);

  const handleSearch = (query) => {
    if (query) {
      setFilteredMessages(
        messages.filter((msg) =>
          msg.receiver?.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredMessages(messages);
    }
  };
  
  

  return (
    <div className="MessagePage">
      <h1 className="Messages">Messages</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <SearchBar onSearch={handleSearch} />

      <div className="cards-container">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => <NoteCard data={msg} key={index} />)
        ) : (
          <p>No messages available.</p>
        )}
      </div>

      <button onClick={() => navigate("/new-message")} className="sendMessageBtn">
        Send New Message
      </button>
    </div>
  );
}

export default MessagePage;
