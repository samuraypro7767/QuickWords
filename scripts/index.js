let generatedLetters = [];
let players = JSON.parse(localStorage.getItem("playerNames")) || ["Jugador 1", "Jugador 2"];
let currentPlayerIndex = 0;
let allPlayersData = [];
let enteredWords = [];
let score = 0;
const modal = document.getElementById("mainModal");

// Generar una letra aleatoria
function randomLetter() {
    let letter;
    do {
        const randomNumber = Math.floor(Math.random() * 26);
        letter = String.fromCharCode(65 + randomNumber);
    } while (generatedLetters.includes(letter));
    generatedLetters.push(letter);
    return letter;
}

// Temporizador
function contadorAtras() {
    let tiempoRestante = 59;
    let intervalo = setInterval(() => {
        if (tiempoRestante > 0) {
            document.getElementById('time').innerText = `00:${tiempoRestante < 10 ?  + tiempoRestante : tiempoRestante}`;
            tiempoRestante--;
        } else {
            document.getElementById('time').innerText = "Final";
            clearInterval(intervalo);
            mostrarPalabras();
            document.querySelector(".word-input").disabled = true;
            openModal();
        }
    }, 1000);
}

// Guardar la palabra
function guardarPalabra() {
    const input = document.querySelector(".word-input");
    const palabra = input.value.trim().toUpperCase();
    const letraGenerada = document.getElementById("letter").innerText;

    if (palabra === "") {
        alert("Debes ingresar una palabra.");
        return;
    }

    if (!palabra.startsWith(letraGenerada)) {
        alert(`La palabra debe comenzar con la letra ${letraGenerada}`);
        return;
    }

    if (enteredWords.includes(palabra)) {
        alert("Esta palabra ya ha sido ingresada. Intenta con otra.");
        return;
    }

    // Agregar la palabra y actualizar la puntuación
    enteredWords.push(palabra);
    score += 10;
    document.querySelector(".score").innerHTML = `<i class='bx bxs-star' style='color:#f5db24'></i>${score}`;
    input.value = "";
}

// Mostrar palabras en el modal
function mostrarPalabras() {
    document.querySelector(".num-points").innerText = score;
}

// Abrir el modal
const openModal = () => {
    modal.showModal();
    document.querySelector("#mainModal .player-name").innerText = players[currentPlayerIndex];
    document.querySelector(".num-points").innerText = score;

    if (currentPlayerIndex === players.length - 1) {
        document.getElementById("nextPlayerBtn").style.display = "none";
        document.getElementById("viewClasificationBtn").style.display = "block";
    } else {
        document.getElementById("nextPlayerBtn").style.display = "block";
        document.getElementById("viewClasificationBtn").style.display = "none";
    }
};

// Cambiar al siguiente jugador
const nextPlayer = () => {
    allPlayersData.push({
        nombre: players[currentPlayerIndex],
        palabras: [...enteredWords],
        puntos: score
    });

    // Guardar en localStorage para asegurar que los datos se mantengan
    localStorage.setItem("playersResults", JSON.stringify(allPlayersData));

    currentPlayerIndex++;

    if (currentPlayerIndex < players.length) {
        score = 0;
        enteredWords = [];
        document.querySelector(".score").innerHTML = `<i class='bx bxs-star' style='color:#f5db24'></i>${score}`;
        document.querySelector(".word-input").disabled = false;
        document.getElementById('letter').innerText = randomLetter();
        document.querySelector(".player-name").innerText = players[currentPlayerIndex];
        modal.close();
        contadorAtras();
    } else {
        document.getElementById("nextPlayerBtn").style.display = "none";
        document.getElementById("viewClasificationBtn").style.display = "block";
    }
};

// Ver la clasificación
const viewClasification = () => {
    // Verificar si el último jugador ya fue guardado
    if (!allPlayersData.some(player => player.nombre === players[currentPlayerIndex])) {
        allPlayersData.push({
            nombre: players[currentPlayerIndex],
            palabras: [...enteredWords],  // Guardamos las palabras también
            puntos: score
        });

        // Guardar en localStorage
        localStorage.setItem("playersResults", JSON.stringify(allPlayersData));
    }

    console.log("Datos guardados en localStorage:", JSON.parse(localStorage.getItem("playersResults")));

    window.location.href = '../templates/classification.html';
};

window.onload = function () {
    document.getElementById('letter').innerText = randomLetter();
    document.querySelector(".player-name").innerText = players[currentPlayerIndex];
    contadorAtras();
};

document.querySelector(".word-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guardarPalabra();
    }
});