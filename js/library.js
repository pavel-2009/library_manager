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
    setBooks(books) {
        this.books = books;
    }
    getBooks(searchParams) {
        if (!searchParams) {
            return this.books;
        }
        const query = searchParams.query?.trim().toLowerCase();
        const title = searchParams.title?.trim().toLowerCase();
        const author = searchParams.author?.trim().toLowerCase();
        const isRead = searchParams.isRead;
        return this.books.filter((book) => {
            const matchesQuery = !query || book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query);
            const matchesTitle = !title || book.title.toLowerCase().includes(title);
            const matchesAuthor = !author || book.author.toLowerCase().includes(author);
            const matchesReadState = isRead === undefined || book.isRead === isRead;
            return matchesQuery && matchesTitle && matchesAuthor && matchesReadState;
        });
    }
    getAllBooks() {
        return this.books;
    }
}
