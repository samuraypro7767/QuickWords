 
 let audio = new Audio('../assets/audio/Don Miguelo - Y Que Fue_.mp3');
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


