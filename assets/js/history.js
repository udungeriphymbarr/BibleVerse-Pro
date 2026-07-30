function saveSearch(reference) {
  searchHistory = searchHistory.filter((item) => item !== reference);

  searchHistory.unshift(reference);

searchHistory = searchHistory.slice(0, CONFIG.MAX_HISTORY);

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

function clearHistory() {
  searchHistory = [];

  localStorage.removeItem("searchHistory");

  renderSearchHistory();
}