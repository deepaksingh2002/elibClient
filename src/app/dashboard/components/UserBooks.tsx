"use client";

import { useState, useEffect } from "react";
import { User, Book } from "@/types";
import { getUserBooks, deleteBook } from "@/lib/api";
import UploadBookModal from "./UploadBookModal";
import EditBookModal from "./EditBookModal";
import BookCard from "./BookCard";

interface UserBooksProps {
  user: User;
}

const UserBooks = ({ user }: UserBooksProps) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    setLoading(true);
    setError("");
    const result = await getUserBooks();
    if (result.success && result.books) {
      setBooks(result.books);
    } else {
      setError(result.message || "Failed to fetch books");
    }
    setLoading(false);
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    const result = await deleteBook(bookId);
    if (result.success) {
      setBooks(books.filter((b) => b._id !== bookId));
    } else {
      setError(result.message || "Failed to delete book");
    }
  };

  const handleBookUploaded = () => {
    setShowUploadModal(false);
    fetchUserBooks();
  };

  const handleBookUpdated = () => {
    setEditingBook(null);
    fetchUserBooks();
  };

  return (
    <div>
      {/* Upload Button */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-all font-medium"
        >
          <span>+</span>
          <span>Upload New Book</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Books Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Books ({books.length})
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-xl text-gray-600">Loading your books...</div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No books yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start sharing your books with the community!
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-all font-medium"
            >
              <span>+</span>
              <span>Upload Your First Book</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                isOwner={book.author?._id === user._id}
                onEdit={() => setEditingBook(book)}
                onDelete={() => handleDeleteBook(book._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadBookModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleBookUploaded}
        />
      )}

      {editingBook && (
        <EditBookModal
          isOpen={!!editingBook}
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSuccess={handleBookUpdated}
        />
      )}
    </div>
  );
};

export default UserBooks;
