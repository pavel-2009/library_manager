import { Library } from './library'
import { renderBooks } from './render'

const library = new Library()

const form = document.querySelector('.add_form__form') as HTMLFormElement

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const titleInput = document.querySelector('.add_form__form-input.title') as HTMLInputElement
    const authorInput = document.querySelector('.add_form__form-input.author') as HTMLInputElement
    const pagesInput = document.querySelector('.add_form__form-input.pages') as HTMLInputElement
    const isReadInput = document.querySelector('label.add_form__status-label') as HTMLLabelElement

    const title = titleInput.value.trim()
    const author = authorInput.value.trim()
    const pages = parseInt(pagesInput.value.trim(), 10)
    const isRead = isReadInput.textContent === 'Прочитана'

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

    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    isReadInput.textContent = 'Прочитана'
})

// Добавляем листенер на всю страницу пр загрузке, чтобы отрисовать книги, если они есть
document.addEventListener('DOMContentLoaded', () => {
    renderBooks(library.getAllBooks())
})