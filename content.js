document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "c") {
    // createMessageDiv();
    //
    const existingDiv = document.getElementById("copy-message-extension");
    if (existingDiv) {
      existingDiv.remove();
      return;
    }
    fetchJsonAndShow();
  }
});

function fetchJsonAndShow() {
  const url = "https://b.hatena.ne.jp/entry/json/" + window.location.href;

  chrome.runtime.sendMessage({ action: "fetchUrl", url }, (response) => {
    if (response.success) {
      const table = createTableFromBookmarks(response.data.bookmarks);
      showMessage(table, true);
    } else {
      showMessage(`Error: ${response.error}`);
    }
  });
}

function createTableFromBookmarks(bookmarks) {
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";
  table.style.backgroundColor = "white";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const headers = ["user", "comment", "tag", "time"];

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.style.color = "black";
    th.style.border = "1px solid black";
    th.style.padding = "8px";
    th.style.backgroundColor = "#f2f2f2";
    th.textContent = headerText;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  bookmarks.forEach((bookmark) => {
    if (bookmark.comment == "") {
      return;
    }

    const row = document.createElement("tr");

    const userCell = document.createElement("td");
    userCell.style.color = "black";
    userCell.style.border = "1px solid black";
    userCell.style.padding = "8px";
    userCell.style.textAlign = "left";
    userCell.textContent = bookmark.user;
    row.appendChild(userCell);

    const commentCell = document.createElement("td");
    commentCell.style.color = "black";
    commentCell.style.border = "1px solid black";
    commentCell.style.padding = "8px";
    commentCell.style.textAlign = "left";
    commentCell.textContent = bookmark.comment;
    row.appendChild(commentCell);

    const tagsCell = document.createElement("td");
    tagsCell.style.color = "black";
    tagsCell.style.border = "1px solid black";
    tagsCell.style.padding = "8px";
    tagsCell.textContent = bookmark.tags.join(", ");
    row.appendChild(tagsCell);

    const timestampCell = document.createElement("td");
    timestampCell.style.color = "black";
    timestampCell.style.border = "1px solid black";
    timestampCell.style.padding = "8px";
    timestampCell.style.width = "100px";
    // timestampCell.textContent = new Date(
    //   bookmark.timestamp * 1000
    // ).toLocaleString();
    timestampCell.textContent = bookmark.timestamp.split(" ")[0];
    row.appendChild(timestampCell);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  const tableWrapper = document.createElement("div");
  tableWrapper.style.overflow = "auto";
  tableWrapper.style.maxHeight = "500px"; // ヘッダーの高さを引く
  tableWrapper.appendChild(table);

  return tableWrapper;
}

function showMessage(message, isTable = false) {
  const div = document.createElement("div");
  div.id = "copy-message-extension";
  // div.style.overflow = "auto";
  // div.style.maxHeight = "50%";

  if (isTable) {
    div.appendChild(message);
  } else {
    div.innerText = message;
  }

  document.body.appendChild(div);

  // setTimeout(() => {
  //   div.remove();
  // }, 10000);
}
