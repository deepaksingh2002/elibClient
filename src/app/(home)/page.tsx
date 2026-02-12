import Banner from './components/Banner';
import Image from 'next/image';
import BookList from './components/BookList';
import { Suspense } from 'react';
import Loading from '../../components/Loading';
import { error } from 'console';
// export const dynamic = 'force-dynamic';

export default async function Home() {
    const response = await fetch(`${process.env.BACKEND_URL}/books`);
    if(!response.ok){
        throw new Error()
    }
    return (
        <>
            <Banner />
            <Suspense fallback={<Loading />}>
                <BookList />
            </Suspense>
        </>
    );
}