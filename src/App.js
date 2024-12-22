import React from "react";
import CommentList from "./components/CommentList";
import { CommentsProvider } from "./contexts/commentsContext";

const App = () => {
  return (
    <div className="app">
      <h1>Comment Section</h1>
      <CommentsProvider>
        <CommentList />
      </CommentsProvider>
    </div>
  );
};

export default App;
