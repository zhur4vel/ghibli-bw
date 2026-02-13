document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('startOverlay');
    const music = document.getElementById('bgMusic');

    // Функция запуска
    function startExperience(event) {
        // Важно: предотвращаем двойные срабатывания
        event.preventDefault();

        // 1. Сначала явно загружаем трек (хак для Android)
        music.load();

        // 2. Ставим громкость на максимум (на случай, если она сброшена)
        music.volume = 1.0;
        music.currentTime = 0;

        // 3. Пытаемся запустить
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Audio started!");
                // Убираем оверлей ТОЛЬКО если музыка реально пошла
                overlay.classList.add('hidden');

                // Убираем слушателей
                removeListeners();
            })
                .catch(error => {
                    console.log("Audio blocked:", error);
                    // Если заблокировали - пробуем еще раз (не убираем оверлей)
                    // Можно добавить сюда alert("Нажми еще раз"), но лучше просто ждать второго клика
                });
        }
    }

    function removeListeners() {
        document.body.removeEventListener('click', startExperience);
        document.body.removeEventListener('touchstart', startExperience);
    }

    // ВАЖНО: Используем 'click' как основной триггер.
    // 'touchstart' на Android часто глючит с правами на звук.
    // Мы вешаем click, он работает везде на 100%.
    document.body.addEventListener('click', startExperience, { once: false });
});