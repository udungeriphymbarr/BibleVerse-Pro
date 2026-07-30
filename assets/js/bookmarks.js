function bookmarkVerse(data) {
  const exists = bookmarks.some((item) => item.reference === data.reference);

  if (exists) {
    alert("This verse is already bookmarked.");

    return;
  }

  bookmarks.push({
    reference: data.reference,

    text: data.text,

    translation: translationSelect.value,
  });

  localStorage.setItem(
    "bookmarks",

    JSON.stringify(bookmarks),
  );

  alert("Verse bookmarked successfully!");
}

function showBookmarks() {
  const list = document.getElementById("bookmarkList");

  list.innerHTML = "";

  if (bookmarks.length === 0) {
    list.innerHTML = "<p>No bookmarks yet.</p>";
  }

 bookmarks.forEach((verse, index) => {

    const item = document.createElement("div");

    item.className = "bookmark-item";

    const title = document.createElement("h3");

    title.textContent = verse.reference;

    const text = document.createElement("p");

    text.textContent = verse.text;

    const button = document.createElement("button");

    button.textContent = "Delete";

    button.addEventListener("click", () => {

        deleteBookmark(index);

    });

    item.appendChild(title);

    item.appendChild(text);

    item.appendChild(button);

    list.appendChild(item);

});

  document.getElementById("bookmarkModal").classList.remove("hidden");
}


function closeBookmarks() {
  document.getElementById("bookmarkModal").classList.add("hidden");
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);

  localStorage.setItem(
    "bookmarks",

    JSON.stringify(bookmarks),
  );

  showBookmarks();
}