// Exportar la configuración del modal
export function setupModal() {
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
}