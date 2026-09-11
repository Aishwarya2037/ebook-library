"use client";

const DownloadButton = ({ bookId }: { bookId: string }) => {
  const pdfUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/read/${bookId}`;

  return (
    <a
      href={pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-6 py-3 bg-[#F8843F] text-white rounded-lg font-semibold text-base hover:opacity-90 transition duration-200"
    >
      Read Book
    </a>
  );
};

export default DownloadButton;
