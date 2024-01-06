import CreatePost from "./CreatePost";
const App = function () {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-8">
          <h1>Blog</h1>
        </div>
        <div className="col-6">
          <CreatePost />
        </div>
      </div>

      {/* 
      add post form
      posts list 
      comments per post
      add comment
      */}
    </div>
  );
};
export default App;
