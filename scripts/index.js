let generatedLetters = [];
let enteredWords = [];
let score = 0; // Inicializar puntaje
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

function contadorAtras() {
    let tiempoRestante = 10;
    let intervalo = setInterval(() => {
        if (tiempoRestante > 0) {
            document.getElementById('time').innerText = `00:${tiempoRestante < 10 ? '0' + tiempoRestante : tiempoRestante}`;
            tiempoRestante--;
        } else {
            document.getElementById('time').innerText = "Final";
            clearInterval(intervalo);
            mostrarPalabras();
            document.querySelector(".word-input").disabled = true; // Deshabilitar campo de texto
            document.querySelector(".button-participants").disabled = true; // Deshabilitar botón de añadir palabra
            openModal(); // Abre el modal al finalizar el tiempo
        }
    }, 1000);
}

function guardarPalabra() {
    const input = document.querySelector(".word-input");
    const palabra = input.value.trim().toUpperCase();
    const letraGenerada = document.getElementById("letter").innerText;
    
    if (palabra.startsWith(letraGenerada) && palabra.length > 1) {
        enteredWords.push(palabra);
        score += 10; // Sumar puntos
        document.querySelector(".score").innerHTML = `<i class='bx bxs-star' style='color:#f5db24'></i>${score}`;
        input.value = "";
    } else {
        alert(`La palabra debe comenzar con la letra ${letraGenerada}`);
    }
}

document.querySelector(".button-participants").addEventListener("click", guardarPalabra);

function mostrarPalabras() {
    const lista = document.getElementById("wordList");

    // Limpiar el contenido antes de mostrar las palabras
    lista.innerHTML = "<h3>Palabras ingresadas:</h3>";
    
    if (enteredWords.length > 0) {
        enteredWords.forEach(word => {
            lista.innerHTML += `<p>${word}</p>`;
        });
    } else {
        lista.innerHTML += "<p>No ingresaste palabras válidas.</p>";
    }
    
    // Actualizar la puntuación en el modal
    document.querySelector(".points h1").innerText = score;
}

const openModal = () => {
    modal.showModal(); // Muestra el modal cuando el tiempo se acabe
}

const closeModal = () => {
    modal.close(); // Cierra el modal cuando se haga clic en "Siguiente Jugador"
    
    // Aquí podrías reiniciar los valores si es necesario para el siguiente jugador
    // Por ejemplo, si quieres limpiar el puntaje y las palabras
    score = 0;
    enteredWords = [];
    document.querySelector(".score").innerHTML = `<i class='bx bxs-star' style='color:#f5db24'></i>${score}`;
    document.querySelector(".word-input").disabled = false;
    document.querySelector(".button-participants").disabled = false;
    document.getElementById('letter').innerText = randomLetter(); // Generar una nueva letra
}

window.onload = function() {
    const letter = randomLetter();
    document.getElementById('letter').innerText = letter;
    console.log("Letra generada:", letter);
    contadorAtras();
};
