import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Book } from '../../../types';
import DownloadButton from './components/DownloadButton';

type Props = {
    params: Promise<{ bookId: string }>;
};

const SingleBookPage = async ({ params }: Props) => {
    const { bookId } = await params;
    
    let book: Book | null = null;
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/books/${bookId}`, {
            next: { revalidate: 3600 },
        });
        if (!response.ok) {
            notFound();
        }
        book = await response.json();
    } catch (err) {
        notFound();
    }

    if (!book) {
        notFound();
    }

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-10 px-5 py-10">
            <div className="col-span-2 pr-16 text-primary-950">
                <h2 className="mb-5 text-5xl font-bold leading-[1.1]">{book.title}</h2>
                <span className="font-semibold">by {book.author.name}</span>
                <p className="mt-5 text-lg leading-8">{book.description}</p>
                <DownloadButton fileLink={book.file} />
            </div>
            <div className="flex justify-end">
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    className="rounded-md border max-h-[600px] w-auto"
                    height={600}
                    width={400}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                />
            </div>
        </div>
    );
};

export default SingleBookPage;
