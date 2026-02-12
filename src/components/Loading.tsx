import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-[400px] mx-auto max-w-7xl px-5 pb-10 mb-6 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                <p className="text-primary-700 font-medium">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;