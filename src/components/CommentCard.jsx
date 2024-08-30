import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { pushReaction, removeReaction, updateCommentContent } from "../lib/api";

export default function CommentCard({ comment }) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (comment.reactions.includes(user._id)) setLiked(true);
  }, [user]);
  useEffect(() => setLikeCount(comment.reactions.length), [comment]);
  useEffect(() => {
    if (user._id === comment.userPosted) {
      setIsOwner(true);
      console.log(isOwner);
    }
  }, [user]);

  const handleLike = () => {
    if (liked) {
      removeReaction(comment._id, user._id).then(() => {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      });
      return;
    }
    pushReaction(comment._id, user._id).then(() => {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would typically update the comment content on the server or in state
    updateCommentContent(comment._id, editedComment).then(() =>
      setIsEditing(false)
    );
  };

  return (
    <div className="comment">
      <p style={{ textAlign: "left" }}>Anonymous commented:</p>
      <div className="wrapper">
        {isEditing ? (
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        ) : (
          <p>{editedComment}</p>
        )}
        <div className="comment-actions">
          <button
            onClick={handleLike}
            className={`like-button ${liked ? "liked" : ""}`}
          >
            <HeartIcon liked={liked} />
          </button>
          <span className="like-count">{likeCount}</span>
          {isOwner &&
            (isEditing ? (
              <button onClick={handleSave} className="save-button">
                Save
              </button>
            ) : (
              <button onClick={handleEdit} className="edit-button">
                Edit
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ liked }) {
  return (
    <span style={{ color: liked ? "red" : "black" }}>{liked ? "❤️" : "♡"}</span>
  );
}
