import { Library } from './library.js';
import { renderBooks } from './render.js';
const library = new Library();
// === Add form ===
const form = document.querySelector('.add_form__form');
if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const titleInput = document.querySelector('.add_form__form-input.title');
        const authorInput = document.querySelector('.add_form__form-input.author');
        const pagesInput = document.querySelector('.add_form__form-input.pages');
        const statusSelect = document.querySelector('.add_form__status-select');
        if (!titleInput || !authorInput || !pagesInput || !statusSelect) {
            alert('Не удалось получить форму');
            return;
        }
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const pages = parseInt(pagesInput.value.trim(), 10);
        const isRead = statusSelect.value === 'available';
        if (!title || !author || isNaN(pages)) {
            alert('Пожалуйста, заполните все поля формы');
            return;
        }
        const newBook = {
            id: Date.now(),
            title,
            author,
            pages,
            isRead,
        };
        library.addBook(newBook);
        renderBooks(library.getAllBooks());
        form.reset();
        statusSelect.value = 'available';
    });
}
// Добавляем листенер на всю страницу пр загрузке, чтобы отрисовать книги, если они есть
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(library.getAllBooks());
});
// === Search form + filters ===
const searchForm = document.querySelector('.book_search__form');
if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.querySelector('.book_search__input');
        const titleInput = document.querySelector('.filters__input.title');
        const authorInput = document.querySelector('.filters__input.author');
        const statusSelect = document.querySelector('.filters__select.status');
        if (!titleInput || !authorInput || !statusSelect) {
            alert('Не удалось получить форму');
            return;
        }
        const searchParams = {};
        if (searchInput && searchInput.value.trim()) {
            const searchValue = searchInput.value.trim().toLowerCase();
            searchParams.title = searchValue;
            searchParams.author = searchValue;
        }
        if (titleInput.value.trim()) {
            searchParams.title = titleInput.value.trim();
        }
        if (authorInput.value.trim()) {
            searchParams.author = authorInput.value.trim();
        }
        if (statusSelect.value !== 'all') {
            searchParams.status = statusSelect.value;
        }
        renderBooks(library.getBooks(searchParams));
    });
}
