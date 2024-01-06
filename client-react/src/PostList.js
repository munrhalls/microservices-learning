const PostList = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      <h1>Posts</h1>
      <div className="d-flex flex-row flex-wrap justify-content-between">
        {posts.map((post) => (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={post.id}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;