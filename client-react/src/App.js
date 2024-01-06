import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { useState, useEffect } from "react";

const App = function () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:4005/posts");
      const posts = await res.json();
      setPosts(posts);
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
