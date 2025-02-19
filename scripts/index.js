let generatedLetters = [];

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
    let tiempoRestante = 59;
    let intervalo = setInterval(() => {
        if (tiempoRestante > 0) {
            document.getElementById('time').innerText = `00:${tiempoRestante}`;
            tiempoRestante--;
        } else {
            document.getElementById('time').innerText = "Final";
            clearInterval(intervalo);
        }
    }, 1000);
}


window.onload = function() {
    const letter = randomLetter();
    document.getElementById('letter').innerHTML = letter;
    contadorAtras();
};