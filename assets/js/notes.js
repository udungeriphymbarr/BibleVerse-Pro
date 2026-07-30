function showNotes() {
  if (!currentVerse) {
    alert("Search for a verse first.");

    return;
  }

  const reference = currentVerse.reference;

  noteInput.value = verseNotes[reference] || "";

  notesModal.classList.remove("hidden");
}

function closeNotes() {
  notesModal.classList.add("hidden");
}

function saveNote() {
  const reference = currentVerse.reference;

  verseNotes[reference] = noteInput.value;

  localStorage.setItem(
    "verseNotes",

    JSON.stringify(verseNotes),
  );

  closeNotes();
}

function deleteNote() {
  if (!currentVerse) return;

  const confirmed = confirm("Delete this note?");

  if (!confirmed) return;

  delete verseNotes[currentVerse.reference];

  localStorage.setItem(
    "verseNotes",

    JSON.stringify(verseNotes),
  );

  noteInput.value = "";

  closeNotes();
}