import { Book } from '../../../types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BookCard = ({ book }: { book: Book }) => {
    return (
        <div className="flex gap-5 border border-primary-200 p-5 shadow-md rounded hover:shadow-lg transition">
            <div className="flex-shrink-0">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={120}
                    height={180}
                    className="rounded object-cover"
                />
            </div>
            <div className="flex-1">
                <h2 className="line-clamp-2 text-xl font-bold text-primary-600 text-balance">
                    {book.title}
                </h2>
                <p className="font-bold text-primary-900 mt-1">{book.author.name}</p>
                <p className="text-sm text-primary-700 mt-2 line-clamp-3">{book.description}</p>
                <Link
                    href={`/book/${book._id}`}
                    className="py-1 px-2 rounded border border-primary-500 mt-4 inline-block text-primary-500 font-medium text-sm
                    hover:border-primary-600 hover:bg-primary-50 transition">
                    Read more
                </Link>
            </div>
        </div>
    );
};

export default BookCard;