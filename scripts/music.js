 
 let audio = new Audio('../assets/audio/musica.mp3');
 let isPlaying = true;
 const audioButton = document.getElementById('audioButton');
 const audioIcon = document.getElementById('audioIcon');

 window.addEventListener('load', function () {
     audio.play().catch(error => console.log("La reproduccion no sirve"));
 });

 audioButton.addEventListener('click', function () {
     if (isPlaying) {
         audio.pause();
         audioIcon.classList.replace('bxs-volume-full', 'bxs-volume-mute');
     } else {
         audio.play();
         audioIcon.classList.replace('bxs-volume-mute', 'bxs-volume-full');
     }
     isPlaying = !isPlaying;
 });


// Obtener elementos del DOM
const menuButton = document.querySelector(".menu");
const menuModal = document.getElementById("menuModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// Abrir el modal al hacer clic en el botón del menú
menuButton.addEventListener("click", () => {
    menuModal.showModal();
});

// Cerrar el modal al hacer clic en la "X"
closeModalBtn.addEventListener("click", () => {
    menuModal.close();
});

// Cerrar el modal al hacer clic fuera de él
menuModal.addEventListener("click", (event) => {
    if (event.target === menuModal) {
        menuModal.close();
    }
});