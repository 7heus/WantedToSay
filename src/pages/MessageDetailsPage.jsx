import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptMessages, getMessageById } from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./MessageDetailsPage.css";

function MessageDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      getMessageById(id)
        .then((msg) => {
          decryptMessages(msg, user.uniqueKey).then((response) => {
            if (response && response.data && response.data.length > 0) {
              setMessage(response.data[0]);
            } else {
              setErrorMessage("No message found.");
            }
          });
        })
        .catch((error) => {
          console.error("Failed to load message:", error);
          setErrorMessage("Failed to load message.");
        });
    }
  }, [id, user]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!message) {
    return <div>Loading message...</div>;
  }

  return (
    <div className="MessageDetailPage">
      <h1>Message Detail</h1>
      <div
        className="message-box"
        style={{ backgroundColor: message.color || "white" }}
      >
        <p>{`To: ${message.receiver}`}</p>
        <p style={{ color: message.color === "white" ? "black" : "white" }}>
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default MessageDetailPage;
