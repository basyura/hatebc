document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "c") {
    createMessageDiv();
  }
});

function createMessageDiv() {
  const existingDiv = document.getElementById("copy-message-extension");

  if (existingDiv) {
    existingDiv.remove();
  }

  const div = document.createElement("div");
  div.id = "copy-message-extension";
  div.innerText = "コピーしました!";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 3000);
}
