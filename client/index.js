const addPost = function (e) {
  e.preventDefault();
  console.log(e);
  console.log("what???");
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("submitButton").addEventListener("click", addPost);
});
