import { Book } from './types.js'

export class Library {
    private books: Book[] = []

    addBook(book: Book): void {
        this.books.push(book)
    }

    removeBook(bookId: number): void {
        this.books = this.books.filter(book => book.id !== bookId)
    }

    getBooks(condition: (book: Book) => boolean): Book[] {
        if (typeof condition !== 'function') {
            throw new Error('Condition must be a function')
        }

        return this.books.filter(condition)
    }

    getAllBooks(): Book[] {
        return this.books
    }
}
