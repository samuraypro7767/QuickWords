// Obtener parámetros de la URL
const urlParams = new URLSearchParams(window.location.search);
const color = urlParams.get('color');
const cantidad = parseInt(urlParams.get('cantidad'));

// Función para generar los inputs de los jugadores
function generarInputs(color, cantidad) {
    console.log("Cantidad de jugadores:", cantidad); // Depuración

    const container = document.getElementById('inputs-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos inputs

    if (!cantidad || cantidad <= 0) {
        container.innerHTML = "<p>Ingresa una cantidad válida de jugadores.</p>";
        return;
    }

    for (let i = 0; i < cantidad; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Jugador ${i + 1}`;
        input.classList.add('player-input');
        container.appendChild(input);
        container.appendChild(document.createElement('br')); // Salto de línea
    }
}

// Función para mostrar alertas personalizadas
function showCustomAlert(message, type) {
    const container = document.getElementById('custom-alert-contain');

    // Crear el elemento de la alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-aler ${type}`;
    alertDiv.textContent = message;

    // Botón para cerrar la alerta
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.onclick = () => container.removeChild(alertDiv);

    // Añadir el botón a la alerta
    alertDiv.appendChild(closeButton);

    // Añadir la alerta al contenedor
    container.appendChild(alertDiv);

    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
        if (container.contains(alertDiv)) {
            container.removeChild(alertDiv);
        }
    }, 5000);
}

// Función para guardar los nombres en localStorage y redirigir al juego
function jugar() {
    const inputs = document.querySelectorAll('.player-input');
    let nombres = [];

    for (let input of inputs) {
        if (input.value.trim() === "") {
            showCustomAlert("Todos los jugadores deben ingresar su nombre antes de jugar.", "error");
            return; // Detener la función si falta algún nombre
        }
        nombres.push(input.value.trim());
    }

    // Guardar los nombres en localStorage y redirigir al juego
    localStorage.setItem("playerNames", JSON.stringify(nombres));
    window.location.href = "game.html";
}

// Llamar a la función para generar los inputs
generarInputs(color, cantidad);

// Modificar el botón de jugar para que guarde los nombres
document.querySelector(".button-play-person a").addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir la redirección automática
    jugar();
});