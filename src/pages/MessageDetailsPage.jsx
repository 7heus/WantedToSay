import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    }
  }, [id, user]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
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
          .finally(() => console.log(comments))
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
            comments.map((c, index) => <CommentCard comment={c} />)
          ) : (
            <div>No comments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageDetailPage;
