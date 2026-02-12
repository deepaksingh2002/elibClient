import React from 'react';
import Image from 'next/image';
import { Book } from '../../../types';
import DownloadButton from './components/DownloadButton';

const SingleBookPage = async ({ params }: { params: Promise<{ bookId: string }> }) => {
    const { bookId } = await params; // ✅ Await params first
    console.log('bookId', bookId);
    
    let book: Book | null = null;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/books/${bookId}`, { // ✅ Use awaited bookId
            next: {
                revalidate: 3600,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        book = await response.json();
    } catch (err: any) {
        console.error('Fetch error:', err);
        throw new Error('Error fetching book'); // This will trigger error.tsx
    }

    if (!book) {
        // Use Next.js notFound() for 404s
        // import { notFound } from 'next/navigation';
        // notFound();
        throw new Error('Book not found');
    }

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
            <div className="col-span-2 pr-16 text-primary-950">
                <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
                <span className="font-semibold">by {book.author.name}</span>
                <p className="mt-5 text-lg leading-8">{book.description}</p>
                <DownloadButton fileLink={book.file} />
            </div>
            <div className="flex justify-end">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded-md border"
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
        </div>
    );
};

export default SingleBookPage;
