

let generatedLetters = [];
let players = JSON.parse(localStorage.getItem("playerNames")) || ["Jugador 1", "Jugador 2"];
let currentPlayerIndex = 0;
let allPlayersData = [];
let enteredWords = [];
let score = 0;
const modal = document.getElementById("mainModal");


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


function guardarPalabra() {
    const input = document.querySelector(".word-input");
    const palabra = input.value.trim().toUpperCase();
    const letraGenerada = document.getElementById("letter").innerText;

    if (palabra === "") {
        showCustomAlert("Debes ingresar una palabra.");
        return;
    }

    if (!palabra.startsWith(letraGenerada)) {
         showCustomAlert(`La palabra debe comenzar con la letra ${letraGenerada}`);
        return;
    }

    if (enteredWords.includes(palabra)) {
         showCustomAlert("Esta palabra ya ha sido ingresada. Intenta con otra.");
        return;
    }

  
    enteredWords.push(palabra);
    score += 59;
    document.querySelector(".score").innerHTML = `<i class='bx bxs-star' style='color:#f5db24'></i>${score}`;
    input.value = "";
}

function mostrarPalabras() {
    document.querySelector(".num-points").innerText = score;
}

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


const viewClasification = () => {
 
    if (!allPlayersData.some(player => player.nombre === players[currentPlayerIndex])) {
        allPlayersData.push({
            nombre: players[currentPlayerIndex],
            palabras: [...enteredWords], 
            puntos: score
        });

       
        localStorage.setItem("playersResults", JSON.stringify(allPlayersData));
    }

    console.log("Datos guardados en localStorage:", JSON.parse(localStorage.getItem("playersResults")));

    window.location.href = '../templates/classification.html';
};


function showCustomAlert(message) {
    const alert = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.innerText = message;
    alert.style.display = "block";

    
    setTimeout(() => {
        hideCustomAlert();
    }, 3000);
}


function hideCustomAlert() {
    const alert = document.getElementById("customAlert");
    alert.style.display = "none";
}


document.getElementById("alertCloseBtn").addEventListener("click", hideCustomAlert);

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
