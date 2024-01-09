import { useState } from "react";
import axios from "axios";

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:4001/comments/add", {
      comment,
      postId,
    });
  };

  return (
    <form className="form mt-3" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );
};

export default CreateComment;
