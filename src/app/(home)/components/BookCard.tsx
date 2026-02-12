import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Book } from '@/types';

const BookCard = ({ book }: { book: Book }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cover Image */}
            <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                {book.coverImage ? (
                    <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                        <span className="text-gray-400">No Cover Image</span>
                    </div>
                )}
            </div>

            {/* Book Info */}
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
                    {book.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {book.description}
                </p>

                {/* Genre */}
                <p className="text-xs bg-primary-50 text-primary-600 inline-block px-2 py-1 rounded mb-3">
                    {book.genre}
                </p>

                {/* Author */}
                <p className="text-xs text-gray-500 mb-4">
                    By: {book.author?.name || "Unknown"}
                </p>

                {/* Read More Button */}
                <Link href={`/book/${book._id}`}>
                    <button className="w-full py-2 px-3 bg-primary-50 text-primary-600 rounded hover:bg-primary-100 transition-all font-medium text-sm">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BookCard;