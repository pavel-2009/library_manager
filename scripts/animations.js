// Базовые анимации
const mainContainer = document.querySelector('.main');
const navMenu = document.querySelector('.nav');
const navButton = document.querySelector('.nav-toggle');

if (mainContainer) {
    mainContainer.addEventListener('click', (event) => {
        const target = event.target;

        // Клик был НЕ по кнопке И НЕ по самому меню?
        const clickedOutside = !target.closest('.nav-toggle') && !target.closest('.nav');

        // Если кликнули мимо, и меню сейчас открыто — закрываем его
        if (clickedOutside && navMenu?.classList.contains('is-open')) {
            navMenu.classList.remove('is-open');
        }
    });
}

if (navButton && navMenu) {
    navButton.addEventListener('click', (event) => {
        // Останавливаем всплытие, чтобы клик по кнопке не перехватывался контейнером mainContainer
        event.stopPropagation();
        navMenu.classList.toggle('is-open');
    });
}

// === Анимация для фильтров ===
const filterButton = document.querySelector('.book_search__filters_icon');
const filterContainer = document.querySelector('.filters');

if (filterButton && filterContainer) {
    filterButton.addEventListener('click', (event) => {
        event.stopPropagation();
        filterContainer.classList.toggle('is-open');
    });
}
