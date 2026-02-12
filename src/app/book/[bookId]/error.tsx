'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function BookError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="min-h-[600px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">
          Failed to load book
        </h2>
        <p className="text-primary-700 mb-6 text-center max-w-md">
          {error.message || 'There was an error while fetching the book details.'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-primary-500 text-primary-500 rounded-md hover:bg-primary-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
