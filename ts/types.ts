// Базовые типы 

export interface Book {
    id: number
    title: string
    author: string
    pages: number
    isRead: boolean
}

export interface BookSearchParams {
    title?: string;
    author?: string;
    status?: 'available' | 'checked_out';
}
