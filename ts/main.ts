import { Library } from './library.js'
import { renderBooks } from './render.js'

const library = new Library()

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