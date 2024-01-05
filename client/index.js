const addPost = async function (e) {
  e.preventDefault();
  const form = document.getElementById("formNewPost");
  const formData = new FormData(form);
  const post = formData.get("post");

  const response = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post }),
  });
  console.log(response);
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submitButton").addEventListener("click", addPost);
});
