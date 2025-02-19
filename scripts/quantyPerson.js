const urlParams = new URLSearchParams(window.location.search);
const color = urlParams.get('color');
const cantidad = parseInt(urlParams.get('cantidad'));

// Función para generar los inputs
function generarInputs(color, cantidad) {
    const container = document.getElementById('inputs-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos inputs

    for (let i = 0; i < cantidad; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Jugador ${i + 1}`;
        input.style.backgroundColor = color;
        container.appendChild(input);
        container.appendChild(document.createElement('br')); // Salto de línea
    }
}

// Llamar a la función para generar los inputs
generarInputs(color, cantidad);