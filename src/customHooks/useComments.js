import { useState } from "react";

export const useComments = () => {
  const [comments, setComments] = useState([]);

  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      text,
      parentId,
      likes: 0,
      dislikes: 0,
      replies: [],
    };

    if (parentId === null) {
      setComments([...comments, newComment]);
    } else {
      const updatedComments = addReply(comments, parentId, newComment);
      setComments(updatedComments);
    }
  };

  const addReply = (comments, parentId, newComment) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newComment] };
      } else if (comment.replies && comment.replies.length) {
        return {
          ...comment,
          replies: addReply(comment.replies, parentId, newComment),
        };
      }
      return comment;
    });
  };

  const deleteComment = (id) => {
    const updatedComments = removeComment(comments, id);
    setComments(updatedComments);
  };

  const removeComment = (comments, id) => {
    return comments.reduce((acc, comment) => {
      if (comment.id === id) {
        return acc;
      } else if (comment.replies && comment.replies.length) {
        comment.replies = removeComment(comment.replies, id);
      }
      return [...acc, comment];
    }, []);
  };

  const updateComment = (id, updatedText) => {
    const updatedComments = editComment(comments, id, updatedText);
    setComments(updatedComments);
  };

  const editComment = (comments, id, updatedText) => {
    return comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, text: updatedText };
      } else if (comment.replies && comment.replies.length) {
        return {
          ...comment,
          replies: editComment(comment.replies, id, updatedText),
        };
      }
      return comment;
    });
  };

  const likeComment = (id) => {
    const updatedComments = updateLikesDislikes(comments, id, "like");
    setComments(updatedComments);
  };

  const dislikeComment = (id) => {
    const updatedComments = updateLikesDislikes(comments, id, "dislike");
    setComments(updatedComments);
  };

  const updateLikesDislikes = (comments, id, action) => {
    return comments.map((comment) => {
      if (comment.id === id) {
        if (action === "like") {
          return { ...comment, likes: comment.likes + 1 };
        }
        return { ...comment, dislikes: comment.dislikes + 1 };
      }
      return {
        ...comment,
        replies: updateLikesDislikes(comment.replies, id, action),
      };
    });
  };

  return {
    comments,
    addComment,
    deleteComment,
    updateComment,
    likeComment,
    dislikeComment,
  };
};
