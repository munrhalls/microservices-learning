import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    try {
      await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
    } catch {}
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
