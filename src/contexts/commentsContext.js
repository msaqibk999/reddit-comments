import React, { createContext, useContext } from "react";
import { useComments } from "../customHooks/useComments";

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const commentsManager = useComments();
  return (
    <CommentsContext.Provider value={commentsManager}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error(
      "useCommentsContext must be used within a CommentsProvider"
    );
  }
  return context;
};
