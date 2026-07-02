import { Book, BookSearchParams } from './types.js'

export class Library {
    private books: Book[] = []

    addBook(book: Book): void {
        this.books.push(book)
    }

    removeBook(bookId: number): void {
        this.books = this.books.filter(book => book.id !== bookId)
    }

    getBooks(searchParams?: BookSearchParams): Book[] {

        if (!searchParams) {
            return this.books
        }

        return this.books.filter(book => {
            const matchesTitle = searchParams.title ? book.title.toLowerCase().includes(searchParams.title.toLowerCase()) : true
            const matchesAuthor = searchParams.author ? book.author.toLowerCase().includes(searchParams.author.toLowerCase()) : true
            const matchesStatus = searchParams.status ? (searchParams.status === 'available' ? !book.isRead : book.isRead) : true

            return matchesTitle && matchesAuthor && matchesStatus
        })
    }

    getAllBooks(): Book[] {
        return this.books
    }
}
