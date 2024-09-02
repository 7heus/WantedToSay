import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import messageService from "../services/auth.message.service";
import "./MessagePage.css";
import MessageComponent from "../components/MessagesComp";

function MessagePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [display, setDisplay] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 4;

  const fetchPageData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;

    if (messages.length >= startIndex) {
      setDisplay(messages.slice(startIndex, endIndex));
    }
  };
  useEffect(() => fetchPageData(), [messages, currentPage]);

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

  const nextPage = (e) => {
    if (messages.length > currentPage * display.length) {
      // const startIndex = currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
      // const endIndex = currentPage * ITEMS_PER_PAGE;

      // setDisplay(messages.slice(startIndex, endIndex));

      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = (e) => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="MessagePage">
      <h1>Messages</h1>
      <div className="page-buttons">
        <button
          disabled={currentPage === 1 ? true : false}
          onClick={prevPage}
          style={{ userSelect: "none" }}
        >
          {"<"}
        </button>
        <span>{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={
            currentPage * ITEMS_PER_PAGE >= messages.length ? true : false
          }
          style={{ userSelect: "none" }}
        >
          {">"}
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <MessageComponent display={display} />
      <button
        onClick={() => navigate("/new-message")}
        className="sendMessageBtn"
      >
        Send New Message
      </button>
    </div>
  );
}

export default MessagePage;
