'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
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
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <h1 className="text-5xl font-bold text-primary-500 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-primary-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-primary-700 mb-8 max-w-md text-center">
          {error.message || 'An unexpected error occurred. Please try again.'}
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
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
