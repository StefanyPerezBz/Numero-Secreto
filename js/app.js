let secretNumber;
let attempts;
let maxNumber = 20;
let availableNumbers = [];
let bestScore = localStorage.getItem("bestScore") || "-";

function generateSecretNumber() {
  if (availableNumbers.length === 0) {
    availableNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  return availableNumbers.splice(randomIndex, 1)[0];
}

function updateMessage(text, isSuccess = false) {
  const message = document.getElementById("message");
  message.style.backgroundColor = isSuccess ? "#dcfce7" : "#EDF4C2";
  message.textContent = text;
}

function updateElement(id, text) {
  document.getElementById(id).textContent = text;
}

function checkNumber() {
  const guess = parseInt(document.getElementById("guess").value);

  if (!guess || guess < 1 || guess > maxNumber) {
    updateMessage("¡Ingresa un número válido!");
    return;
  }

  attempts++;
  updateElement("attempts", attempts);

  if (guess === secretNumber) {
    handleWin();
  } else {
    updateMessage(guess > secretNumber ? "¡Muy alto!" : "¡Muy bajo!");
  }

  document.getElementById("guess").value = "";
}

function handleWin() {
  updateMessage("¡Felicitaciones! ¡Has ganado! 🎉", true);
  document.getElementById("checkBtn").disabled = true;
  document.getElementById("resetBtn").disabled = false;

  if (bestScore === "-" || attempts < bestScore) {
    bestScore = attempts;
    localStorage.setItem("bestScore", bestScore);
    updateElement("bestScore", bestScore);
  }
}

function initGame() {
  secretNumber = generateSecretNumber();
  attempts = 0;
  updateElement("attempts", attempts);
  updateElement("bestScore", bestScore);
  updateMessage(`Adivina un número del 1 al ${maxNumber}`);
}

function resetGame() {
  document.getElementById("checkBtn").disabled = false;
  document.getElementById("resetBtn").disabled = true;
  document.getElementById("guess").value = "";
  initGame();
}

initGame();

document.getElementById("guess").addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkNumber();
});
