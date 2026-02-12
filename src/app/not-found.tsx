import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex flex-col items-center justify-center min-h-[600px]">
        <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-primary-700 mb-8 max-w-md text-center">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
