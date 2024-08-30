import React, { useState } from "react";

export default function CommentCard({ comment }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically update the comment content on the server or in state
    console.log("Saving edited comment:", editedComment);
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
          {isEditing ? (
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          ) : (
            <button onClick={handleEdit} className="edit-button">
              Edit
            </button>
          )}
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
