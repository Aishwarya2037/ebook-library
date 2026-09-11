"use client";

const DownloadButton = ({ bookId }: { bookId: string }) => {
  const pdfUrl = `https://ebook-library-wbmv.onrender.com/api/books/read/${bookId}`;

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-5 py-3 bg-[#DA3D20] text-white rounded-lg font-semibold cursor-pointer"
    >
      Read Book
    </a>
  );
};

export default DownloadButton;
