import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { useState, useEffect } from "react";
import axios from "axios";

const App = function () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios
        .get("http://localhost:4005/posts")
        .catch((err) => {
          console.error("Error: ", err);
        });
      console.log("res", res);
      if (res) setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-8">
          <h1>Blog</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <CreatePost />
        </div>
      </div>

      <div className="row mt-5">
        <PostList posts={posts} />
      </div>
      {/* 

      comments per post
      add comment
      */}
    </div>
  );
};
export default App;
