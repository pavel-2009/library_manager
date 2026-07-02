import { Library } from './library.js';
import { renderBooks } from './render.js';
const library = new Library();
const STORAGE_KEY = 'library-books';
function saveBooks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library.getAllBooks()));
}
function loadBooks() {
    const storedBooks = localStorage.getItem(STORAGE_KEY);
    if (!storedBooks) {
        return;
    }
    try {
        const parsedBooks = JSON.parse(storedBooks);
        library.setBooks(parsedBooks);
    }
    catch (error) {
        console.error('Не удалось загрузить книги из LocalStorage:', error);
    }
}
function updateStatistics() {
    const statistics = document.querySelectorAll('.books_statistics__p');
    if (statistics.length < 3) {
        return;
    }
    const books = library.getAllBooks();
    const readCount = books.filter((book) => book.isRead).length;
    const unreadCount = books.length - readCount;
    statistics[0].textContent = String(books.length);
    statistics[1].textContent = String(readCount);
    statistics[2].textContent = String(unreadCount);
}
function getCurrentSearchParams() {
    const searchParams = {};
    const searchInput = document.querySelector('.book_search__input');
    const titleInput = document.querySelector('.filters__input.title');
    const authorInput = document.querySelector('.filters__input.author');
    const statusSelect = document.querySelector('.filters__select.status');
    if (searchInput && searchInput.value.trim()) {
        searchParams.query = searchInput.value.trim();
    }
    if (titleInput && titleInput.value.trim()) {
        searchParams.title = titleInput.value.trim();
    }
    if (authorInput && authorInput.value.trim()) {
        searchParams.author = authorInput.value.trim();
    }
    if (statusSelect && statusSelect.value === 'read') {
        searchParams.isRead = true;
    }
    else if (statusSelect && statusSelect.value === 'unread') {
        searchParams.isRead = false;
    }
    return searchParams;
}
function applySearch() {
    renderBooks(library.getBooks(getCurrentSearchParams()));
}
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
        const isRead = statusSelect.value === 'read';
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
        saveBooks();
        applySearch();
        updateStatistics();
        form.reset();
        statusSelect.value = 'read';
    });
}
// Добавляем листенер на всю страницу при загрузке, чтобы отрисовать книги, если они есть
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    renderBooks(library.getAllBooks());
    updateStatistics();
});
// === Search form + filters ===
const searchInput = document.querySelector('.book_search__input');
const titleFilterInput = document.querySelector('.filters__input.title');
const authorFilterInput = document.querySelector('.filters__input.author');
const statusFilterSelect = document.querySelector('.filters__select.status');
const bookList = document.querySelector('.book_list');
if (searchInput) {
    searchInput.addEventListener('input', applySearch);
}
if (titleFilterInput) {
    titleFilterInput.addEventListener('input', applySearch);
}
if (authorFilterInput) {
    authorFilterInput.addEventListener('input', applySearch);
}
if (statusFilterSelect) {
    statusFilterSelect.addEventListener('change', applySearch);
}
if (bookList) {
    bookList.addEventListener('click', (event) => {
        const target = event.target;
        const removeButton = target.closest('.book_list__delete_book');
        const statusButton = target.closest('.book_list__change_status');
        if (removeButton) {
            const bookItem = removeButton.closest('.book_list__item');
            const bookId = Number(bookItem?.dataset.bookId);
            if (!Number.isNaN(bookId)) {
                library.removeBook(bookId);
                saveBooks();
                applySearch();
                updateStatistics();
            }
            return;
        }
        if (statusButton) {
            const bookItem = statusButton.closest('.book_list__item');
            const bookId = Number(bookItem?.dataset.bookId);
            if (!Number.isNaN(bookId)) {
                const book = library.getAllBooks().find((item) => item.id === bookId);
                if (book) {
                    book.isRead = !book.isRead;
                    saveBooks();
                    applySearch();
                    updateStatistics();
                }
            }
        }
    });
}
