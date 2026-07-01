export class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }
    getBooks(condition) {
        if (typeof condition !== 'function') {
            throw new Error('Condition must be a function');
        }
        return this.books.filter(condition);
    }
    getAllBooks() {
        return this.books;
    }
}
