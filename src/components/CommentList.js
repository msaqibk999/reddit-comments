import React, { useEffect, useRef } from "react";
import CommentItem from "./CommentItem";
import { useCommentsContext } from "../contexts/commentsContext";

const CommentList = () => {
  const { comments, updateTimer, addComment } = useCommentsContext();

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
      <section className="main-comment">
        <input type="text" placeholder="Add a comment" ref={commentRef} />
        <button onClick={handleAddComment}>Add Comment</button>
      </section>
      <section className="comments">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </section>
    </>
  );
};

export default CommentList;
