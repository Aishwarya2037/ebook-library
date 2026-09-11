"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type Props = {
  bookId: string;
};

const PdfReader = ({ bookId }: Props) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(800);

  const pdfUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/read/${bookId}`;

  useEffect(() => {
    const updateWidth = () => {
      setWidth(Math.min(window.innerWidth - 32, 800));
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
              disabled={pageNumber === 1}
              className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
            >
              Previous
            </button>

            <span className="text-sm font-semibold whitespace-nowrap">
              {pageNumber} / {numPages || "..."}
            </span>

            <button
              onClick={() =>
                setPageNumber((page) => Math.min(page + 1, numPages))
              }
              disabled={pageNumber >= numPages}
              className="px-3 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
            }}
            loading={<p className="text-gray-600">Loading PDF...</p>}
            error={<p className="text-red-600">Failed to load PDF.</p>}
          >
            <Page pageNumber={pageNumber} width={width} />
          </Document>
        </div>
      </div>
    </main>
  );
};

export default PdfReader;
