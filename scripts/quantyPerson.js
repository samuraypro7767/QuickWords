const urlParams = new URLSearchParams(window.location.search);
const color = urlParams.get('color');
const cantidad = parseInt(urlParams.get('cantidad'));

// Función para generar los inputs y guardar nombres
function generarInputs(color, cantidad) {
    const container = document.getElementById('inputs-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos inputs

    for (let i = 0; i < cantidad; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder =` Jugador ${i + 1}`;
        input.classList.add('player-input');
        container.appendChild(input);
        container.appendChild(document.createElement('br')); // Salto de línea
    }

    // Botón para guardar nombres
    const saveButton = document.createElement('button');
    saveButton.innerText = "Guardar";
    saveButton.classList.add('button', 'yellow');
    saveButton.onclick = guardarNombres;
    container.appendChild(saveButton);
}

// Función para guardar los nombres en localStorage
function guardarNombres() {
    const inputs = document.querySelectorAll('.player-input');
    let nombres = [];

    inputs.forEach(input => {
        if (input.value.trim() !== "") {
            nombres.push(input.value.trim());
        }
    });

    if (nombres.length > 0) {
        localStorage.setItem("playerNames", JSON.stringify(nombres));
        alert("Nombres guardados correctamente!");
    } else {
        alert("Por favor ingresa al menos un nombre.");
    }
}

// Llamar a la función para generar los inputs
generarInputs(color, cantidad);