import React from 'react';
import BookCard from './BookCard';
import { Book } from '../../../types';

const BookList = async () => {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api/v1';
    
    try {
        const response = await fetch(`${backendUrl}/books`, { 
            cache: 'no-store',
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        const books = await response.json();

        // Handle empty books array
        if (!Array.isArray(books) || books.length === 0) {
            return (
                <div className="text-center py-16 max-w-7xl mx-auto mb-10">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No books available yet</h3>
                    <p className="text-gray-600">Check back soon for new books to explore!</p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
                {books.map((book: Book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching books:', error);
        const errorMessage = error instanceof Error ? error.message : 'Connection refused';
        
        return (
            <div className="text-center py-16 max-w-7xl mx-auto mb-10">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Unable to load books</h3>
                <p className="text-gray-600 mb-4">
                    The server is currently unavailable.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block max-w-md">
                    <p className="text-sm text-yellow-700 font-mono">
                        Backend URL: <strong>{process.env.BACKEND_URL || 'http://localhost:5000/api/v1'}</strong>
                    </p>
                    <p className="text-xs text-yellow-600 mt-2">
                        Error: {errorMessage}
                    </p>
                </div>
                <div className="mt-6 text-gray-600">
                    <p className="text-sm mb-3">To fix this issue:</p>
                    <ol className="text-xs text-left inline-block bg-gray-50 p-4 rounded">
                        <li className="mb-2">✓ Ensure your backend server is running</li>
                        <li className="mb-2">✓ Check that it's accessible at the URL above</li>
                        <li>✓ Try refreshing this page once the backend is ready</li>
                    </ol>
                </div>
            </div>
        );
    }
};

export default BookList;