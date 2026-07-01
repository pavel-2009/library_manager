import { Book } from './types.js'

export function renderBooks(books: Book[]): void {

    const bookList = document.querySelector('.book_list') as HTMLElement

    if (!bookList) {
        throw new Error('Book list element not found')
    }

    if (books.length === 0) {
        bookList.innerHTML = '<p>No books available</p>'
        return
    }

    try {
        bookList.innerHTML = ''

        books.forEach(book => {
            const bookItem = document.createElement('article')
            bookItem.classList.add('book_item')

            bookItem.innerHTML = `
            <div class="book_list__book">
                    <img src="https://kitobxon.com/img_knigi/7177.jpg" alt="" class="book_list__book_img">
                    <div class="book_list__book_info">
                        <h3 class="book_list__book_title">${book.title}</h3>
                        <p class="book_list__book_author">${book.author}</p>
                        <div class="book_list__pages">
                            <svg class="book_list__pages-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open-icon lucide-book-open"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3" 0 0
                            <p class="book_list__pages_number">${book.pages} страниц</p>
                        </div>
                        <p class="book_list__book_status">${book.isRead ? 'Прочитана' : 'Не прочитана'}</p>
                    </div>
                </div>
                <div class="book_list__change">
                    <div class="book_list__change_status">
                        <svg class="book_list__change_status-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-refresh-ccw-icon lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                        <p class="book_list__change_status_text">Изменить статус</p>
                    </div>
                    <div class="book_list__delete_book">
                        <svg class="book_list__delete_book-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        <p class="book_list__delete_book_text">Удалить книгу</p>
                    </div>
                </div>  
            </article>
            `

            bookList.appendChild(bookItem)
        })
    } catch (error) {
        console.error('Error rendering books:', error)
        bookList.innerHTML = '<p>Error rendering books</p>'
    }
}