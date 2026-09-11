"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://unpkg.com/pdfjs-dist@6.3.289/build/pdf.worker.min.mjs";

const PdfReader = () => {
  const params = useParams();

  const bookId = params.bookId as string;

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const pdfUrl = `${backendUrl}/api/books/read/${bookId}`;

  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
              disabled={pageNumber === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3 py-2 font-semibold">
              {pageNumber} / {numPages || "..."}
            </span>

            <button
              onClick={() => setPageNumber((page) => page + 1)}
              disabled={pageNumber >= numPages}
              className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
            >
              Next
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              Download
            </a>
          </div>
        </div>

        {/* PDF */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-auto">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
            loading={
              <p className="text-center py-10 text-gray-600">Loading PDF...</p>
            }
            error={
              <p className="text-center py-10 text-red-600">
                Failed to load PDF.
              </p>
            }
          >
            <div className="flex justify-center">
              <Page
                pageNumber={pageNumber}
                width={
                  typeof window !== "undefined"
                    ? Math.min(window.innerWidth - 40, 800)
                    : 800
                }
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
          </Document>
        </div>
      </div>
    </main>
  );
};

export default PdfReader;
