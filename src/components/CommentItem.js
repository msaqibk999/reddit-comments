import React, { useState, useRef } from "react";
import Up from "../media/up.svg";
import Down from "../media/down.svg";
import Edit from "../media/edit.svg";
import Delete from "../media/delete.svg";
import Reply from "../media/reply.svg";
import { timeSince } from "../helpers/timeSinceCalculator";

const CommentItem = React.memo(
  ({
    comment,
    addComment,
    deleteComment,
    updateComment,
    likeComment,
    dislikeComment,
    depth = 0,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const replyRef = useRef();
    const editRef = useRef();
    const maxDepth = window.innerWidth < 768 ? 4 : 8;

    const handleReply = () => {
      const replyText = replyRef.current.value;
      if (replyText.trim()) {
        if (depth < maxDepth) {
          addComment(replyText, comment.id);
          replyRef.current.value = "";
          setIsReplying(false);
        }else{
          setIsReplying(false);
          const formattedTime = new Date(comment.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          const text = `@${comment.user}[${formattedTime}]: "${comment.text}", ${replyText}`
          addComment(text, null)
          alert("Max Depth Reached, started a new thread")
        }
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
          <div className="comment-header">
            <div className="user-name">User</div>
            <div>{timeSince(comment.timestamp)}</div>
            {comment.isEdited && <div>(Edited)</div>}
          </div>
          {isEditing ? (
            <div className="edit-reply-container">
              <input
                className="edit-input"
                type="text"
                defaultValue={comment.text}
                ref={editRef}
              />
              <div className="reply-btns">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="comment-text">{comment.text}</div>
          )}
          {!isEditing && (
            <div className="button-group">
              <button onClick={() => likeComment(comment.id)}>
                <img className="icon" src={Up} alt="" />{" "}
                {comment.likes > 0 ? comment.likes : ""}
              </button>
              <button onClick={() => dislikeComment(comment.id)}>
                <img className="icon" src={Down} alt="" />{" "}
                {comment.dislikes > 0 ? comment.dislikes : ""}
              </button>
              <button onClick={() => setIsEditing(true)}>
                <img className="icon" src={Edit} alt="" />
              </button>
              <button onClick={() => deleteComment(comment.id)}>
                <img className="icon" src={Delete} alt="" />
              </button>
              {!isReplying && (
                <button
                  onClick={() => {
                    setIsReplying(true);
                    setShowReplies(true);
                  }}
                >
                  <img className="icon" src={Reply} alt="" />
                </button>
              )}
              {comment.replies.length > 0 && (
                <button
                  onClick={() => {
                    setShowReplies(!showReplies);
                  }}
                >
                  {showReplies ? "Hide" : `Show(${comment.replies.length})`}{" "}
                  Replies
                </button>
              )}
            </div>
          )}

          {isReplying && (
            <div className="edit-reply-container">
              <input
                type="text"
                placeholder="Write a reply..."
                ref={replyRef}
                className="reply-input"
              />
              <div className="reply-btns">
                <button onClick={handleReply}>Add</button>
                <button onClick={() => setIsReplying(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        <div className="comment-replies">
          {showReplies &&
            comment.replies.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                likeComment={likeComment}
                dislikeComment={dislikeComment}
                depth={depth + 1}
              />
            ))}
        </div>
      </div>
    );
  }
);

export default CommentItem;
