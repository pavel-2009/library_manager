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
    getBooks(searchParams) {
        if (!searchParams) {
            return this.books;
        }
        return this.books.filter(book => {
            const matchesTitle = searchParams.title ? book.title.toLowerCase().includes(searchParams.title.toLowerCase()) : true;
            const matchesAuthor = searchParams.author ? book.author.toLowerCase().includes(searchParams.author.toLowerCase()) : true;
            const matchesStatus = searchParams.status ? (searchParams.status === 'available' ? !book.isRead : book.isRead) : true;
            return matchesTitle && matchesAuthor && matchesStatus;
        });
    }
    getAllBooks() {
        return this.books;
    }
}
