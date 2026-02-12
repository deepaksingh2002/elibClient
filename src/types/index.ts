export type Book = {
    _id: string;
    title: string;
    description: string;
    coverImage: string;
    file: string;
    genre: string;
    author: Author;
    createdAt?: string;
    updatedAt?: string;
};

export type Author = {
    name: string;
    _id: string;
};

export type User = {
    _id: string;
    name: string;
    email: string;
    password?: string;
};

export type AuthResponse = {
    success: boolean;
    message: string;
    token?: string;
    user?: User;
};

export type CreateBookPayload = {
    title: string;
    genre: string;
    description: string;
    coverImage?: File;
    file?: File;
};

export type UpdateBookPayload = {
    title?: string;
    genre?: string;
    description?: string;
    coverImage?: File;
    file?: File;
};

export type BookResponse = {
    success: boolean;
    message: string;
    book?: Book;
};

export type BooksListResponse = {
    success: boolean;
    message: string;
    books?: Book[];
};