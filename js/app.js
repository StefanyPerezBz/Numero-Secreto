let secretNumber;
let attemptsLeft;
let maxNumber;
let bestScore = localStorage.getItem("bestScore") || "-";
let userName = localStorage.getItem("userName") || "";

// Mostrar alertas
function showAlert(message, type = "info") {
    const alertContainer = document.getElementById("alertsContainer");
    const alert = document.createElement("div");
    alert.className = `alert ${type}`;
    alert.textContent = message;
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Guardar nombre de usuario
function saveUserName() {
    userName = document.getElementById("name").value.trim();
    if (userName) {
        localStorage.setItem("userName", userName);
        showAlert(`¡Bienvenido, ${userName}!`, "success");
        document.getElementById("startGameBtn").disabled = false;
    } else {
        showAlert("Por favor, ingresa tu nombre.", "error");
    }
}

// Generar número secreto
function generateSecretNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Validar rango máximo
function validateRange() {
    const rangeInput = document.getElementById("range");
    const value = parseInt(rangeInput.value);

    if (value < 5) {
        rangeInput.classList.add("error");
        document.getElementById("startGameBtn").disabled = true;
        showAlert("El rango mínimo debe ser 5 o mayor.", "error");
    } else {
        rangeInput.classList.remove("error");
        document.getElementById("startGameBtn").disabled = false;
    }
}

// Iniciar juego
function startGame() {
    if (!userName) {
        saveUserName();
        return;
    }

    const rangeInput = document.getElementById("range");
    maxNumber = parseInt(rangeInput.value);
    attemptsLeft = maxNumber * 0.5;

    document.getElementById("rangeDisplay").textContent = maxNumber;
    document.getElementById("attemptsLeft").textContent = attemptsLeft;
    document.getElementById("progressBar").value = attemptsLeft;
    document.getElementById("gameContent").classList.remove("hidden");
    document.getElementById("settings").classList.add("hidden");
    document.getElementById("resetBtn").classList.remove("disabled");
    document.getElementById("resetBtn").disabled = false;

    secretNumber = generateSecretNumber(maxNumber);

    showAlert(`¡Juego iniciado, ${userName}! Adivina el número.`, "success");
}

// Verificar intento
function checkGuess() {
    const guessInput = document.getElementById("guess");
    const guess = parseInt(guessInput.value);

    if (!guess || guess < 1 || guess > maxNumber) {
        showAlert(`Ingresa un número entre 1 y ${maxNumber}.`, "error");
        return;
    }

    if (guess === secretNumber) {
        showAlert("🎉 ¡Correcto! Has ganado.", "success");
        if (bestScore === "-" || attemptsLeft > bestScore) {
            bestScore = attemptsLeft;
            localStorage.setItem("bestScore", bestScore);
            document.getElementById("bestScore").textContent = bestScore;
        }
        endGame();
        return;
    }

    // Decrementar intentos solo si no ha ganado
    attemptsLeft--;
    document.getElementById("attemptsLeft").textContent = attemptsLeft;
    document.getElementById("progressBar").value = attemptsLeft;

    if (attemptsLeft === 0) {
        showAlert("😞 ¡Has perdido! Se acabaron los intentos.", "error");
        endGame();
    } else {
        showAlert(guess > secretNumber ? "📉 Muy alto." : "📈 Muy bajo.", "info");
    }
}

// Terminar juego
function endGame() {
    document.getElementById("checkBtn").classList.add("hidden");
    document.getElementById("resetBtn").classList.remove("disabled");
    document.getElementById("resetBtn").disabled = false;
}

// Reiniciar juego
function resetGame() {
    window.location.href = "/"; 
}

// Inicialización
if (userName) {
    document.getElementById("nameField").style.display = "none"; 
}
validateRange();

document.getElementById("name").addEventListener("blur", saveUserName);
document.getElementById("range").addEventListener("input", validateRange);
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("checkBtn").addEventListener("click", checkGuess);
document.getElementById("resetBtn").addEventListener("click", resetGame);
