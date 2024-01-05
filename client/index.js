const populatePosts = function (posts) {
  const postsContainer = document.getElementById("postsContainer");
  let postsDisplay = ``;

  posts.forEach((post) => {
    postsDisplay += `
    <div class="col-4">
        <div class="card  mt-2 mb-2 p-2">
            <h3>${post.title}</h3>
        </div>
    </div>
        `;
  });
  postsContainer.innerHTML = postsDisplay;
};

const getPosts = async function () {
  const response = await fetch("http://localhost:4000/posts");
  const data = await response.json();
  return data;
};

const addPost = async function (e) {
  e.preventDefault();
  const form = document.getElementById("formNewPost");
  const formData = new FormData(form);
  const title = formData.get("title");

  const response = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title }),
  });
};

document.addEventListener("DOMContentLoaded", async function () {
  const { posts } = await getPosts();
  populatePosts(posts);

  document.getElementById("submitButton").addEventListener("click", addPost);
});
