import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onCommentSubmit = () => {
    axios.post(`http://localhost:4000/posts/${postId}/comments`, { content });
    setContent("");
  };

  return (
    <form onSubmit={onCommentSubmit}>
      <div className="form-group mb-3">
        <label className="form-label">Comment</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </div>
      <button type="submit" className="btn btn-secondary">
        Submit
      </button>
    </form>
  );
};

export default CommentCreate;
