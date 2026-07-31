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
      `${CONFIG.API_URL}/${encodeURIComponent(reference)}`
    );

    if (!response.ok) {
      throw new Error("Failed to load daily verse.");
    }

    const data = await response.json();

    // Save to app state
    dailyVerse = data;

    // Save to localStorage
    localStorage.setItem(
      "dailyVerse",
      JSON.stringify(data)
    );

    localStorage.setItem(
      "dailyVerseDate",
      new Date().toDateString()
    );

    // Update the UI
    renderDailyVerse();

  } catch (error) {
    console.error("Daily Verse Error:", error);
  }
}