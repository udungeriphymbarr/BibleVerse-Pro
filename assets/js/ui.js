/* ==========================================
   DOM ELEMENTS
========================================== */

const searchBtn = document.getElementById("searchBtn");

const referenceInput = document.getElementById("reference");

const translationSelect = document.getElementById("translation");

const versesContainer = document.getElementById("verses");

const loading = document.getElementById("loading");

const errorBox = document.getElementById("error");

const bookmarkBtn = document.getElementById("bookmarkBtn");

const audioBtn = document.getElementById("audioBtn");

const themeBtn = document.getElementById("themeBtn");

const notesModal = document.getElementById("notesModal");

const closeNotesBtn = document.getElementById("closeNotes");

const noteInput = document.getElementById("noteInput");

const saveNoteBtn = document.getElementById("saveNoteBtn");

const deleteNoteBtn = document.getElementById("deleteNoteBtn");

function renderDailyVerse() {
  const box = document.getElementById("dailyVerse");

  box.innerHTML = `

        <strong>Today's Verse</strong>

        <p>

            "${dailyVerse.text}"

        </p>

        <small>

            ${dailyVerse.reference}

        </small>

    `;
}

/* ==========================================
   UI HELPERS
========================================== */

function showError(message) {
  errorBox.textContent = message;

  errorBox.classList.remove("hidden");
}

function clearMessages() {
  errorBox.textContent = "";

  errorBox.classList.add("hidden");
}

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}