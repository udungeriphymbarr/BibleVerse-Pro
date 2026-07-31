/* ==========================================
   INITIALIZATION
========================================== */
function handleReferenceKeydown(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}

function init() {

  bindEvents();

  initNavigation();

  loadTheme();

  loadDailyVerse();

  renderSearchHistory();

  initFAQ();

}

function bindEvents() {

  searchBtn.addEventListener("click", handleSearch);

  referenceInput.addEventListener("keydown", handleReferenceKeydown);

  bookmarkBtn.addEventListener("click", showBookmarks);

  audioBtn.addEventListener("click", toggleAudio);

  themeBtn.addEventListener("click", toggleTheme);

  closeNotesBtn.addEventListener("click", closeNotes);

  saveNoteBtn.addEventListener("click", saveNote);

  deleteNoteBtn.addEventListener("click", deleteNote);

  const notesBtn = document.getElementById("notesBtn");

  notesBtn.addEventListener("click", showNotes);

    notesModal.addEventListener("click", function (event) {
    if (event.target === notesModal) {
      closeNotes();
    }
  });

  document
    .getElementById("closeBookmarkModal")
    .addEventListener("click", closeBookmarks);

  document
    .getElementById("clearHistoryBtn")
    .addEventListener("click", clearHistory);

}

document.addEventListener(
    "DOMContentLoaded",
    init
);


