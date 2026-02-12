import React from 'react';
import Image from 'next/image';
import { Book } from '../../../types';
import DownloadButton from './components/DownloadButton';
import { Metadata } from 'next';

export async function generateMetadata({
    params,
}: {
    params: { bookId: string };
}): Promise<Metadata> {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api/v1';
        const response = await fetch(`${backendUrl}/books/${params.bookId}`, {
            next: { revalidate: 3600 },
        });
        if (!response.ok) throw new Error('Book not found');
        const book: Book = await response.json();

        return {
            title: `${book.title} - Coders Book`,
            description: book.description,
        };
    } catch {
        return {
            title: 'Book - Coders Book',
            description: 'Read more about this book',
        };
    }
}

const SingleBookPage = async ({ params }: { params: { bookId: string } }) => {
    let book: Book | null = null;
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api/v1';
        const response = await fetch(`${backendUrl}/books/${params.bookId}`, {
            next: {
                revalidate: 3600,
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching book');
        }
        book = await response.json();
    } catch (err: any) {
        throw new Error('Error fetching book');
    }

    if (!book) {
        throw new Error('Book not found');
    }

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-3 gap-10 px-5 py-10">
            <div className="lg:col-span-2 text-primary-950">
                <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
                <span className="font-semibold text-lg">by {book.author.name}</span>
                <div className="mt-5 border-t pt-5">
                    <h3 className="font-bold mb-2">Description</h3>
                    <p className="text-lg leading-8 text-primary-800">{book.description}</p>
                </div>
                <DownloadButton fileLink={book.file} />
            </div>
            <div className="flex justify-center lg:justify-end">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded-md border border-primary-200 shadow-lg"
                    height={400}
                    width={280}
                />
            </div>
        </div>
    );
};

export default SingleBookPage;