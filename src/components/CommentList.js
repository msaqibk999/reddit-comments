import React, { useEffect, useRef } from "react";
import CommentItem from "./CommentItem";
import { useComments } from "../customHooks/useComments";

const CommentList = () => {
  const {
    comments,
    updateTimer,
    addComment,
    deleteComment,
    updateComment,
    likeComment,
    dislikeComment,
  } = useComments();

  useEffect(() => {
    const timer = setInterval(() => {
      // Trigger re-render to update timeSince
      updateTimer();
    }, 60000); // Every minute

    return () => clearInterval(timer); // Cleanup on unmount
  }, [updateTimer]);

  const commentRef = useRef();
  
  const handleAddComment = () => {
    const commentText = commentRef.current.value;
    if (commentText.trim()) {
      addComment(commentText, null);
      commentRef.current.value = "";
    }
  };

  return (
    <>
      <div className="main-comment">
        <input type="text" placeholder="Add a comment" ref={commentRef} />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          addComment={addComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
          likeComment={likeComment}
          dislikeComment={dislikeComment}
        />
      ))}
    </>
  );
};

export default CommentList;
