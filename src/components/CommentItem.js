import React, { useState, useRef } from "react";
import Up from "../media/up.svg";
import Down from "../media/down.svg";

const CommentItem = React.memo(
  ({
    comment,
    addComment,
    deleteComment,
    updateComment,
    likeComment,
    dislikeComment,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const replyRef = useRef();
    const editRef = useRef();

    const handleReply = () => {
      const replyText = replyRef.current.value;
      if (replyText.trim()) {
        addComment(replyText, comment.id);
        replyRef.current.value = "";
        setIsReplying(false);
      }
    };

    const handleUpdate = () => {
      const editText = editRef.current.value;
      if (editText.trim()) {
        updateComment(comment.id, editText);
        setIsEditing(false);
      }
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
    };

    return (
      <div className="comment-item">
        <img
          src="https://www.redditstatic.com/avatars/avatar_default_02_FF4500.png"
          alt=""
          className="user-img"
        />
        <div className="comment-content">
          <div className="user-name">User</div>
          {isEditing ? (
            <input
              className="comment-edit"
              type="text"
              defaultValue={comment.text}
              ref={editRef}
            />
          ) : (
            <div className="comment-text">{comment.text}</div>
          )}
          <div className="button-group">
            <button onClick={() => likeComment(comment.id)}>
              <img className="arrow" src={Up} alt="" />{" "}
              {comment.likes > 0 ? comment.likes : ""}
            </button>
            <button onClick={() => dislikeComment(comment.id)}>
              <img className="arrow" src={Down} alt="" />{" "}
              {comment.dislikes > 0 ? comment.dislikes : ""}
            </button>
            {isEditing ? (
              <>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
            {!isReplying && (
              <button onClick={() => setIsReplying(true)}>Reply</button>
            )}
          </div>
          {isReplying && (
            <div className="reply-container">
              <input
                type="text"
                placeholder="Write a reply..."
                ref={replyRef}
                className="reply-input"
              />
              <div className="reply-btns">
                <button onClick={handleReply}>Add Reply</button>
                <button onClick={() => setIsReplying(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        {comment.replies.map((child) => (
          <CommentItem
            key={child.id}
            comment={child}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
          />
        ))}
      </div>
    );
  }
);

export default CommentItem;
