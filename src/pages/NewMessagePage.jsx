import React, { useContext, useState, useEffect } from "react";
import { postMessage } from "../lib/api";
import { useNavigate } from "react-router-dom";
import "./NewMessagePage.css";
import { AuthContext } from "../context/auth.context";
import { getUserKey } from "../lib/api";

function NewMessagePage() {
  const [recipient, setRecipient] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [color, setColor] = useState("#FFFFFF");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const hexValidator = /^#?([A-F0-9]{6}|[A-F0-9]{3})$/;

  const { user, isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleMessageContentChange = (e) => setMessageContent(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value.toUpperCase());

  const handleSendMessage = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!hexValidator.test(color)) {
      setErrorMessage("Please input a valid hex code! (Eg: #FFFFFF)");
      return;
    }

    if (recipient.trim() === "" || messageContent.trim() === "") {
      setErrorMessage("Recipient and message content cannot be empty.");
      return;
    }
    if (user) {
      postMessage(messageContent, user.uniqueKey, recipient, color)
        .then(() => navigate("/messages"))
        .catch((err) => {
          console.error(err);
          setErrorMessage("Failed to send message.");
        });
    }
  };

  return (
    <div className="NewMessagePage">
      <form onSubmit={handleSendMessage}>
        <h1>Send New Message</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label>Recipient:</label>
          <input
            type="text"
            value={recipient}
            onChange={handleRecipientChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={messageContent}
            onChange={handleMessageContentChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hex Color code (Optional):</label>
          <input type="color" name="colors" onChange={handleColorChange} />
          {/* <input type="text" value={color} onChange={handleColorChange} /> */}
        </div>
        <button
          type="submit"
          style={{ visibility: !user ? "hidden" : "visible" }}
          className="sendMessageBtn"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default NewMessagePage;
