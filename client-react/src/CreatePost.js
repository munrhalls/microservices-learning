import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/posts", {
        title: title,
      })
      .catch((err) => console.log(err));

    setTitle("");
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form className="form mt-3" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};
export default CreatePost;
