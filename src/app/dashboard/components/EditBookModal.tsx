"use client";

import { FormEvent, useState, useEffect } from "react";
import { updateBook } from "@/lib/api";
import { Book } from "@/types";

interface EditBookModalProps {
  isOpen: boolean;
  book: Book;
  onClose: () => void;
  onSuccess: () => void;
}

const EditBookModal = ({
  isOpen,
  book,
  onClose,
  onSuccess,
}: EditBookModalProps) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string>(book.coverImage);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    setTitle(book.title);
    setDescription(book.description);
    setCoverPreview(book.coverImage);
    setCoverImage(null);
    setFile(null);
    setError("");
    setFileError("");
  }, [book, isOpen]);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError("Cover image must be less than 10MB");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        setFileError("Cover image must be an image file");
        return;
      }
      setCoverImage(selectedFile);
      setFileError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 30 * 1024 * 1024) {
        setFileError("PDF file must be less than 30MB");
        return;
      }
      if (selectedFile.type !== "application/pdf") {
        setFileError("File must be a PDF");
        return;
      }
      setFile(selectedFile);
      setFileError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setFileError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setLoading(true);

    const result = await updateBook(book._id, {
      title,
      description,
      coverImage: coverImage || undefined,
      file: file || undefined,
    });

    if (result.success) {
      onSuccess();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl max-h-screen overflow-auto my-8">
        {/* Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Book</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* File Error */}
        {fileError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{fileError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter book title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter book description"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image (Max 10MB)
            </label>
            <div className="flex gap-4">
              {coverPreview && (
                <div className="w-20 h-28 rounded border border-gray-300 overflow-hidden">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            {coverImage && (
              <p className="text-xs text-gray-500 mt-2">
                New image selected: {coverImage.name}
              </p>
            )}
          </div>

          {/* PDF File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PDF File (Max 30MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {file && (
              <p className="text-xs text-gray-500 mt-2">
                New file selected: {file.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
