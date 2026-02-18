'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation'; 
import { Book } from '../../../types';
import DownloadButton from './components/DownloadButton';

const SingleBookPage = () => {
  const params = useParams();
  const bookId = params.bookId as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${bookId}`,
          { 
            next: { revalidate: 3600 },
            cache: 'force-cache'
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const bookData = await response.json();
        setBook(bookData);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]); 

  if (loading) {
    return <div className="mx-auto max-w-6xl px-5 py-10">Loading...</div>;
  }

  if (error || !book) {
    return <div className="mx-auto max-w-6xl px-5 py-10">Book not found</div>;
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
      <div className="col-span-2 pr-16 text-primary-950">
        <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
        <span className="font-semibold">by {book.author?.name}</span>
        <p className="mt-5 text-lg leading-8">{book.description}</p>
        <DownloadButton fileLink={book.file} bookTitle={book.title} />
      </div>
      <div className="flex justify-end">
        <Image
          src={book.coverImage}
          alt={book.title}
          className="rounded-md border"
          height={400}
          width={300}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
};

export default SingleBookPage;
