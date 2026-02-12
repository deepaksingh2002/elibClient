import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <div className="mx-auto max-w-7xl py-10 px-5">
            <div className="relative overflow-hidden rounded-lg">
                <Image
                    src={'/paper-bg.jpg'}
                    alt="Library background"
                    className="h-72 w-full object-cover"
                    height={288}
                    width={1200}
                    priority
                />
                <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-950 opacity-30" />
                <Image
                    src={'/book.png'}
                    alt="Featured book"
                    className="absolute bottom-0 right-5"
                    height={288}
                    width={200}
                />
                <h3 className="absolute left-10 top-1/2 w-full max-w-3xl -translate-y-1/2 text-5xl font-semibold tracking-tight text-white drop-shadow-lg">
                    Connect, Share and Trade Your Favourite Reads...
                </h3>
            </div>
        </div>
    );
};

export default Banner;