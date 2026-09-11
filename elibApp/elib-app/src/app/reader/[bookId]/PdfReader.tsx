"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type Props = {
  bookId: string;
};

const PdfReader = ({ bookId }: Props) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  const pdfUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/read/${bookId}`;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-40"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {pageNumber} of {numPages || "..."}
            </span>

            <button
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages))
              }
              disabled={pageNumber >= numPages}
              className="px-4 py-2 rounded bg-gray-800 text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex justify-center overflow-auto">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-gray-600">Loading PDF...</p>}
            error={<p className="text-red-600">Failed to load PDF.</p>}
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(
                800,
                typeof window !== "undefined" ? window.innerWidth - 32 : 800,
              )}
            />
          </Document>
        </div>
      </div>
    </main>
  );
};

export default PdfReader;
