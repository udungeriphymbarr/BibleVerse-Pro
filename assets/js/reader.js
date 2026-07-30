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