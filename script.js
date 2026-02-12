document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('startOverlay');
    const music = document.getElementById('bgMusic');

    // Функция, которая запускается при клике
    function startExperience() {
        // Убираем оверлей
        overlay.classList.add('hidden');

        // Запускаем музыку с начала
        music.currentTime = 0;
        music.play()
            .then(() => {
                console.log("Music started successfully");
            })
            .catch(error => {
                console.log("Playback failed:", error);
                // Иногда на айфонах нужен второй клик, если первый не сработал
                // Но обычно оверлей помогает это обойти.
            });

        // Убираем слушатель событий, чтобы повторные клики не сбрасывали трек
        document.body.removeEventListener('click', startExperience);
        document.body.removeEventListener('touchstart', startExperience);
    }

    // Вешаем слушатель клика (и тача для мобилок) на весь экран
    document.body.addEventListener('click', startExperience);
    document.body.addEventListener('touchstart', startExperience, { passive: false });
});