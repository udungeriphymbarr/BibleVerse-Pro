/* ==========================================
   BIBLEVERSE PRO v1.0
   Main JavaScript File
   Author: TeeTechs
========================================== */
const dailyVerses = [
  "John 3:16",

  "Romans 8:28",

  "Psalm 23:1",

  "Philippians 4:13",

  "Isaiah 41:10",

  "Jeremiah 29:11",

  "Psalm 46:1",

  "Joshua 1:9",

  "Proverbs 3:5-6",

  "Matthew 11:28",

  "2 Corinthians 5:17",

  "Psalm 121:1-2",

  "Hebrews 11:1",

  "Lamentations 3:22-23",

  "Romans 12:2",
];

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

/* ==========================================
   INITIALIZATION
========================================== */

function init() {
  // Search button
  searchBtn.addEventListener("click", handleSearch);

  // Press Enter inside search input
  referenceInput.addEventListener("keydown", handleReferenceKeydown);

  // Open bookmarks
  bookmarkBtn.addEventListener("click", showBookmarks);

  // Audio
  audioBtn.addEventListener("click", toggleAudio);

  // Dark mode
  themeBtn.addEventListener("click", toggleTheme);

  // Load saved theme
  loadTheme();

  loadDailyVerse();

  renderSearchHistory();

  document
    .getElementById("clearHistoryBtn")
    .addEventListener("click", clearHistory);

  noteBtn.addEventListener(
    "click",

    showNotes,
  );

  closeNotesBtn.addEventListener("click", closeNotes);

  saveNoteBtn.addEventListener("click", saveNote);

  deleteNoteBtn.addEventListener("click", deleteNote);

  notesModal.addEventListener("click", function (event) {
    if (event.target === notesModal) {
      closeNotes();
    }
  });

  const menuBtn = document.getElementById("menuBtn");

  const navMenu = document.querySelector(".nav-menu");

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuBtn.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
  });

  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  initFAQ();
}

/* ==========================================
   APP STATE
========================================== */

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

let currentVerse = null;

let speech = window.speechSynthesis;

let dailyVerse = null;

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

let verseNotes = JSON.parse(localStorage.getItem("verseNotes")) || {};

/* ==========================================
   EVENT LISTENERS
========================================== */

searchBtn.addEventListener("click", handleSearch);

referenceInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

function handleReferenceKeydown(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}

function toggleAudio() {
  if (!currentVerse) {
    alert("Search for a verse first.");

    return;
  }

  if (speech.speaking) {
    speech.cancel();

    audioBtn.textContent = "🔊 Audio";

    return;
  }

  const utterance = new SpeechSynthesisUtterance(
    `${currentVerse.reference}. ${currentVerse.text}`,
  );

  utterance.rate = 0.95;

  utterance.pitch = 1;

  utterance.volume = 1;

  utterance.onstart = () => {
    audioBtn.textContent = "⏹ Stop Audio";
  };

  utterance.onend = () => {
    audioBtn.textContent = "🔊 Audio";
  };

  speech.speak(utterance);
}

/* ==========================================
   SEARCH HANDLER
========================================== */

async function handleSearch() {
  const reference = referenceInput.value.trim();

  const translation = translationSelect.value;

  clearMessages();

  if (reference === "") {
    showError("Please enter a Bible reference.");

    referenceInput.focus();

    return;
  }

  saveSearch(reference);

  showLoading();

  await fetchVerse(reference, translation);
}

async function fetchVerse(reference, translation) {
  try {
    const response = await fetch(
      `https://bible-api.com/${encodeURIComponent(reference)}?translation=${translation}`,
    );

    if (!response.ok) {
      throw new Error("Scripture not found.");
    }

    const data = await response.json();

    displayVerse(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// SAVE SEARCH
function saveSearch(reference) {
  searchHistory = searchHistory.filter((item) => item !== reference);

  searchHistory.unshift(reference);

  searchHistory = searchHistory.slice(0, 10);

  localStorage.setItem(
    "searchHistory",

    JSON.stringify(searchHistory),
  );

  renderSearchHistory();
}

function renderSearchHistory() {
  const historyList = document.getElementById("historyList");

  const clearBtn = document.getElementById("clearHistoryBtn");

  historyList.innerHTML = "";

  if (searchHistory.length === 0) {
    clearBtn.style.display = "none";

    return;
  }

  clearBtn.style.display = "inline-flex";

  searchHistory.forEach((reference) => {
    const button = document.createElement("button");

    button.className = "history-chip";

    button.textContent = reference;

    button.addEventListener("click", () => {
      referenceInput.value = reference;

      handleSearch();
    });

    historyList.appendChild(button);
  });
}

// LOAD DAILY VERSE
async function loadDailyVerse() {
  const today = new Date().toDateString();

  const savedDate = localStorage.getItem("dailyVerseDate");

  const savedVerse = localStorage.getItem("dailyVerse");

  if (savedDate === today && savedVerse) {
    dailyVerse = JSON.parse(savedVerse);

    renderDailyVerse();

    return;
  }

  const index = new Date().getDate() % dailyVerses.length;

  const reference = dailyVerses[index];

  await fetchDailyVerse(reference);
}

async function fetchDailyVerse(reference) {
  try {
    const response = await fetch(
      `https://bible-api.com/${encodeURIComponent(reference)}`,
    );

    const data = await response.json();

    dailyVerse = data;

    localStorage.setItem(
      "dailyVerse",

      JSON.stringify(data),
    );

    localStorage.setItem(
      "dailyVerseDate",

      new Date().toDateString(),
    );

    renderDailyVerse();
  } catch (error) {
    console.error(error);
  }
}

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

function clearHistory() {
  searchHistory = [];

  localStorage.removeItem("searchHistory");

  renderSearchHistory();
}

// DISPLAY VERSE

function displayVerse(data) {
  speech.cancel();

  versesContainer.innerHTML = `

        <article class="verse-card">

            <div class="verse-header">

                <h2>${data.reference}</h2>

                <span class="translation">

                    ${translationSelect.value.toUpperCase()}

                </span>

            </div>

            <blockquote>

                ${data.text}

            </blockquote>

            <div class="verse-actions">

                <button id="copyBtn">

                    📋 Copy

                </button>

                <button id="shareBtn">

                    📤 Share

                </button>

                <button id="saveBtn">

                    ⭐ Bookmark

                </button>

            </div>

        </article>

    `;

  versesContainer.scrollIntoView({
    behavior: "smooth",
  });

  currentVerse = data;

  initializeVerseActions(data);
}

function initializeVerseActions(data) {
  const copyBtn = document.getElementById("copyBtn");

  const shareBtn = document.getElementById("shareBtn");

  const saveBtn = document.getElementById("saveBtn");

  copyBtn.addEventListener("click", () => {
    copyVerse(data);
  });

  shareBtn.addEventListener("click", () => {
    shareVerse(data);
  });

  saveBtn.addEventListener("click", () => {
    bookmarkVerse(data);
  });
}

async function copyVerse(data) {
  const verse = `${data.reference}

${data.text}`;

  await navigator.clipboard.writeText(verse);

  alert("Verse copied successfully!");
}

async function shareVerse(data) {
  if (navigator.share) {
    await navigator.share({
      title: data.reference,

      text: data.text,
    });
  } else {
    copyVerse(data);
  }
}

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

bookmarkBtn.addEventListener("click", showBookmarks);

document
  .getElementById("closeBookmarkModal")
  .addEventListener("click", closeBookmarks);

function showBookmarks() {
  const list = document.getElementById("bookmarkList");

  list.innerHTML = "";

  if (bookmarks.length === 0) {
    list.innerHTML = "<p>No bookmarks yet.</p>";
  }

  bookmarks.forEach((verse, index) => {
    list.innerHTML += `

            <div class="bookmark-item">

                <h3>${verse.reference}</h3>

                <p>${verse.text}</p>

                <button onclick="deleteBookmark(${index})">

                    Delete

                </button>

            </div>

        `;
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

// NOTES
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

// FAQ
function initFAQ(){

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item=>{

        const question = item.querySelector(".faq-question");

        question.addEventListener("click",()=>{

            faqItems.forEach(other=>{

                if(other!==item){

                    other.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}

/* ==========================================
   THEME
========================================== */

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  updateThemeButton(isDark);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");

    updateThemeButton(true);
  } else {
    updateThemeButton(false);
  }
}

function updateThemeButton(isDark) {
  themeBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
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

init();
