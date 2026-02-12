'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function HomeError({
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
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">
          Failed to load books
        </h2>
        <p className="text-primary-700 mb-6 text-center max-w-md">
          {error.message || 'There was an error while fetching the books. Please make sure your backend server is running.'}
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
            Refresh
          </Link>
        </div>
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm max-w-md">
          <p className="font-semibold mb-2">Backend Connection Guide:</p>
          <p>Make sure your backend server is running at: <code className="bg-white px-2 py-1 rounded">http://localhost:5000</code></p>
        </div>
      </div>
    </div>
  );
}
