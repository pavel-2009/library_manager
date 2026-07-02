import { Library } from './library.js'
import { renderBooks } from './render.js'
import { BookSearchParams } from './types.js'

const library = new Library()

// === Add form ===
const form = document.querySelector('.add_form__form') as HTMLFormElement | null

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const titleInput = document.querySelector('.add_form__form-input.title') as HTMLInputElement | null
        const authorInput = document.querySelector('.add_form__form-input.author') as HTMLInputElement | null
        const pagesInput = document.querySelector('.add_form__form-input.pages') as HTMLInputElement | null
        const statusSelect = document.querySelector('.add_form__status-select') as HTMLSelectElement | null

        if (!titleInput || !authorInput || !pagesInput || !statusSelect) {
            alert('Не удалось получить форму')
            return
        }

        const title = titleInput.value.trim()
        const author = authorInput.value.trim()
        const pages = parseInt(pagesInput.value.trim(), 10)
        const isRead = statusSelect.value === 'available'

        if (!title || !author || isNaN(pages)) {
            alert('Пожалуйста, заполните все поля формы')
            return
        }

        const newBook = {
            id: Date.now(),
            title,
            author,
            pages,
            isRead,
        }

        library.addBook(newBook)
        renderBooks(library.getAllBooks())
        form.reset()
        statusSelect.value = 'available'
    })
}

// Добавляем листенер на всю страницу пр загрузке, чтобы отрисовать книги, если они есть
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(library.getAllBooks())
})


// === Search form + filters ===
const searchForm = document.querySelector('.book_search__form') as HTMLFormElement

if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const searchInput = document.querySelector('.book_search__input') as HTMLInputElement | null

        const titleInput = document.querySelector('.filters__input.title') as HTMLInputElement | null
        const authorInput = document.querySelector('.filters__input.author') as HTMLInputElement | null
        const statusSelect = document.querySelector('.filters__select.status') as HTMLSelectElement | null

        if (!titleInput || !authorInput || !statusSelect) {
            alert('Не удалось получить форму')
            return
        }

        const searchParams: BookSearchParams = {}

        if (searchInput && searchInput.value.trim()) {
            const searchValue = searchInput.value.trim().toLowerCase()
            searchParams.title = searchValue
            searchParams.author = searchValue
        }

        if (titleInput.value.trim()) {
            searchParams.title = titleInput.value.trim()
        }

        if (authorInput.value.trim()) {
            searchParams.author = authorInput.value.trim()
        }

        if (statusSelect.value !== 'all') {
            searchParams.status = statusSelect.value as 'available' | 'checked_out'
        }

        renderBooks(library.getBooks(searchParams))
    })
}
