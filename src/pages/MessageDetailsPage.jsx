{
  /*import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (user) {
      getMessageById(id)
        .then((msg) => {
          decryptMessages(msg, user.uniqueKey).then((response) => {
            if (response && response.data && response.data.length > 0) {
              setMessage(response.data[0]);
              fetchComments(response.data[0]._id);
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

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/api/comments/post/${postId}`);
      // Ensure response data is an array
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  // Handle comment input change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Submit a new comment
  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await axios.post("/api/comments", {
          postId: message._id,
          userPosted: user._id,
          content: comment,
        });
        setComment("");
        fetchComments(message._id);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

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
      <div className="comment-section">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c._id} className="comment">
                {c.content}
              </div>
            ))
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageDetailPage; */
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { decryptMessages, getMessageById, postComment } from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./MessageDetailsPage.css";

function MessageDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (user) {
      getMessageById(id)
        .then((msg) => {
          decryptMessages(msg, user.uniqueKey).then((response) => {
            if (response && response.data && response.data.length > 0) {
              setMessage(response.data[0]);
              fetchComments(response.data[0]._id);
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

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`/api/comments/post/${postId}`);
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        postComment(id, user._id, comment)
          .then((data) => {
            setComments((prev) => [...prev, data]);
          })
          .finally(() => console.log(comments))
          .catch((err) => console.error(err));
        setComment("");
        fetchComments(message._id);
      } catch (error) {
        console.error("Error adding comment:", error);
        setErrorMessage("Failed to add comment.");
      }
    }
  };

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
      <div className="comment-section">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={index} className="comment">
                {c && c.content}
              </div>
            ))
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageDetailPage;
