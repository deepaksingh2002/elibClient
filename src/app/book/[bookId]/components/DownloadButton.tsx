'use client';
import React from 'react';

const DownloadButton = ({ fileLink, bookTitle }: { 
  fileLink: string; 
  bookTitle: string;
}) => {
  const handleDownload = () => {
    // Create temporary anchor for proper download
    const link = document.createElement('a');
    link.href = fileLink;
    link.download = `${bookTitle}.pdf`; // Forces download with custom name
    link.target = '_blank'; // Open in new tab as fallback
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-10 h-10 rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-600 active:bg-primary-700"
    >
      Download the book
    </button>
  );
};

export default DownloadButton;


