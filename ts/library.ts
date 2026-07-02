import { Book, BookSearchParams } from './types.js'

export class Library {
    private books: Book[] = []

    addBook(book: Book): void {
        this.books.push(book)
    }

    removeBook(bookId: number): void {
        this.books = this.books.filter(book => book.id !== bookId)
    }

    setBooks(books: Book[]): void {
        this.books = books
    }

    getBooks(searchParams?: BookSearchParams): Book[] {
        if (!searchParams) {
            return this.books
        }

        const query = searchParams.query?.trim().toLowerCase()
        const title = searchParams.title?.trim().toLowerCase()
        const author = searchParams.author?.trim().toLowerCase()
        const isRead = searchParams.isRead

        return this.books.filter((book) => {
            const matchesQuery = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
            const matchesTitle = !title || book.title.toLowerCase().includes(title)
            const matchesAuthor = !author || book.author.toLowerCase().includes(author)
            const matchesReadState = isRead === undefined || book.isRead === isRead

            return matchesQuery && matchesTitle && matchesAuthor && matchesReadState
        })
    }

    getAllBooks(): Book[] {
        return this.books
    }
}
