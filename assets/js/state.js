/* ==========================================
   APP STATE
========================================== */

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

let currentVerse = null;

let dailyVerse = null;

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

let verseNotes = JSON.parse(localStorage.getItem("verseNotes")) || {};
