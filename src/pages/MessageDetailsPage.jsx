{
  /*import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  decryptMessages,
  getCommentsPost,
  getMessageById,
  postComment,
} from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./MessageDetailsPage.css";
import CommentCard from "../components/CommentCard";

function MessageDetailPage() {
  const { id } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const nav = useNavigate();
  const MAX_CHARS = 500;

  useEffect(() => {
    if (user) {
      if (!isLoggedIn) {
        nav("/login");
        return;
      }
      getMessageById(id)
        .then((msg) => {
          decryptMessages([msg], user.uniqueKey).then((response) => {
            if (response && response.data && response.data.length > 0) {
              setMessage(response.data[0]);
              getCommentsPost(id).then((dat) => {
                setComments(dat);
              });
            } else {
              setErrorMessage("No message found.");
            }
          });
        })
        .catch((error) => {
          console.error("Failed to load message:", error);
          setErrorMessage("Failed to load message.");
        });
      setIsLoaded(true);
    } else {
      nav("/login");
      return;
    }
  }, [user, isLoggedIn]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        postComment(id, user._id, comment)
          .then((data) => {
            setComment("");
            getCommentsPost(id).then((dat) => {
              setComments(dat);
            });
          })
          .catch((err) => console.error(err));
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
        <p className="message-recipient">{`To: ${message.receiver}`}</p>
        <p className="message-content">{message.content}</p>
      </div>
      <div className="comment-section">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          style={{ resize: "none" }}
          maxLength={MAX_CHARS}
        />
        <hr />
        <label style={{ color: charCount > MAX_CHARS && "red" }}>
          {charCount <= MAX_CHARS
            ? `${charCount}/${MAX_CHARS}`
            : `${MAX_CHARS - charCount}`}
        </label>
        <hr />
        <br />
        <button onClick={handleCommentSubmit}>Add Comment</button>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c, index) => <CommentCard comment={c} key={index} />)
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
import { useNavigate, useParams } from "react-router-dom";
import {
  decryptMessages,
  getCommentsPost,
  getMessageById,
  postComment,
} from "../lib/api";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./MessageDetailsPage.css";
import CommentCard from "../components/CommentCard";

function MessageDetailPage() {
  const { id } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const nav = useNavigate();
  const MAX_CHARS = 500;

  useEffect(() => {
    if (user) {
      if (!isLoggedIn) {
        nav("/login");
        return;
      }
      getMessageById(id)
        .then((msg) => {
          decryptMessages([msg], user.uniqueKey).then((response) => {
            if (response && response.data && response.data.length > 0) {
              setMessage(response.data[0]);
              getCommentsPost(id).then((dat) => {
                setComments(dat);
              });
            } else {
              setErrorMessage("No message found.");
            }
          });
        })
        .catch((error) => {
          console.error("Failed to load message:", error);
          setErrorMessage("Failed to load message.");
        });
    } else {
      nav("/login");
    }
  }, [user, isLoggedIn, id, nav]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await postComment(id, user._id, comment);
        setComment("");
        // Fetch the latest comments
        getCommentsPost(id).then((dat) => {
          // Place the new comment at the top
          setComments((prevComments) => [
            dat[dat.length - 1],
            ...dat.slice(0, -1),
          ]);
        });
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
      <div className="message-box">
        <p className="message-recipient">{`To: ${message.receiver}`}</p>
        <p className="message-content">{message.content}</p>
      </div>

      <div className="comment-section">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          maxLength={MAX_CHARS}
        />
        <label style={{ color: charCount > MAX_CHARS ? "red" : "black" }}>
          {charCount}/{MAX_CHARS}
        </label>
        <button onClick={handleCommentSubmit}>Add Comment</button>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <CommentCard comment={c} key={c._id || index} />
          ))
        ) : (
          <div>No comments yet.</div>
        )}
      </div>
    </div>
  );
}

export default MessageDetailPage;
