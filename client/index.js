const getPosts = async function () {
  const response = await fetch("http://localhost:4000/posts");
  const data = await response.json();
  return data;
};

const addPost = async function (e) {
  e.preventDefault();
  console.log("Add post runs");
  const form = document.getElementById("formNewPost");
  const formData = new FormData(form);
  const title = formData.get("title");

  try {
    await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });
  } catch (err) {
    console.error(err);
  }

  form.reset();
};

const addComment = async function (id) {
  console.log("Add comment runs");
  const form = e.target.closest("form");
  const formData = new FormData(form);
  console.log(form);
  const comment = formData.get("comment");

  try {
    await fetch("http://localhost:4001/comments/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, comment: comment }),
    });
  } catch (err) {
    console.error(err);
  }

  form.reset();
};

const populatePosts = function (posts) {
  const postsContainer = document.getElementById("postsContainer");
  let postDisplay = ``;

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("col-4");

    let postsDisplay = `
        <div class="card  mt-2 mb-2 p-2">
            <h3>${post.title}</h3>
        </div>
        <form id="form-${post.id}" class="form mt-5">
        <h4>Add a comment</h4>
          <div class="input-group">
            <input type="text" name="comment" required />
          </div>

          <div class="mt-3 input-group">
            <button id="submitButtonComment" class="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
        `;

    postDiv.innerHTML = postDisplay;
    postDiv
      .getElementsByTagName("form")[0]
      .addEventListener("submit", function (e) {
        e.preventDefault();
        addComment(post.id);
      });
    postsContainer.appendChild(postDiv);
  });
};

document.addEventListener("DOMContentLoaded", async function () {
  const { posts } = await getPosts();
  populatePosts(posts);

  document.getElementById("submitButton").addEventListener("click", addPost);
});
