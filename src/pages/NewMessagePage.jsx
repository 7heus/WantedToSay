{
  /*import React, { useState } from "react";
import messageService from "../services/auth.message.service";
import { useNavigate } from "react-router-dom";
import "./NewMessagePage.css";

function NewMessagePage() {
  const [recipient, setRecipient] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleMessageContentChange = (e) => setMessageContent(e.target.value);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (recipient.trim() === "" || messageContent.trim() === "") {
      setErrorMessage("Recipient and message content cannot be empty.");
      return;
    }

    const messageData = { recipient, content: messageContent };

    console.log("Sending message data:", messageData); // Debugging

    messageService
      .sendMessage(messageData)
      .then((response) => {
        console.log("Message sent successfully:", response.data);
        navigate("/messages"); // Redirect to the messages page after sending the message
      })
      .catch((error) => {
        setErrorMessage("Failed to send message.");
      });
  };

  return (
    <div className="NewMessagePage">
      <h1>Send New Message</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSendMessage}>
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
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default NewMessagePage; */
}

import React, { useContext, useState, useEffect } from "react";
import messageService from "../services/auth.message.service";
import { useNavigate } from "react-router-dom";
import "./NewMessagePage.css";
import { AuthContext } from "../context/auth.context";
import { getUserKey } from "../lib/api";

function NewMessagePage() {
  const [recipient, setRecipient] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [color, setColor] = useState(""); // Optional color field
  const [errorMessage, setErrorMessage] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) getUserKey(user._id).then((key) => console.log(key));
  }, [user]);

  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleMessageContentChange = (e) => setMessageContent(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (recipient.trim() === "" || messageContent.trim() === "") {
      setErrorMessage("Recipient and message content cannot be empty.");
      return;
    }
    if (user) {
      const messageData = {
        secretKey: secretKey,
        receiver: recipient,
        content: messageContent,
        color: color,
        // Send null if not provided
      };
      console.log(messageData);

      messageService
        .sendMessage(messageData)
        .then(() => {
          navigate("/messages"); // Redirect to the messages page after sending the message
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          setErrorMessage("Failed to send message.");
        });
    }
  };

  return (
    <div className="NewMessagePage">
      <h1>Send New Message</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSendMessage}>
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
          <label>Color (Optional):</label>
          <input type="text" value={color} onChange={handleColorChange} />
        </div>
        <button
          type="submit"
          style={{ visibility: !user ? "hidden" : "visible" }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default NewMessagePage;
