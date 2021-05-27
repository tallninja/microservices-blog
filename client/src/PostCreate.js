import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/posts", { title });

    setTitle("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group mb-3">
        <label className="form-label">Post Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );
};

export default PostCreate;
