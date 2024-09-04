import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import "./CommentCard.css";
import {
  pushReaction,
  removeReaction,
  updateCommentContent,
  deleteComment,
} from "../lib/api";
import { getCommentsPost } from "../lib/api";

export default function CommentCard({ comment }) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [isOwner, setIsOwner] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

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
    if (editedComment.length === 0) {
      setIsRemoved(true);
      deleteComment(comment._id);
      return;
    }
    updateCommentContent(comment._id, editedComment).then(() =>
      setIsEditing(false)
    );
  };

  return (
    <>
      {!isRemoved && (
        <div className="comment-card">
          <div className="comment-header">
            <p className="user-name">Anonymous</p>
          </div>
          <div className="comment-body">
            {isEditing ? (
              <textarea
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                className="edit-textarea"
              />
            ) : (
              <p className="comment-text">{editedComment}</p>
            )}
          </div>
          <div className="comment-actions">
            <button onClick={handleLike} className="like-button">
              <HeartIcon liked={liked} />
            </button>
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
      )}
    </>
  );
}

function HeartIcon({ liked }) {
  return (
    <span style={{ fontSize: "24px", color: liked ? "red" : "black" }}>
      {liked ? "❤️" : "♡"}
    </span>
  );
}
