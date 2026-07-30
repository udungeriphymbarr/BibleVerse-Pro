const speech = window.speechSynthesis;

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
