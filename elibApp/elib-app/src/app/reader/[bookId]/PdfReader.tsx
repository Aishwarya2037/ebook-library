"use client";

type Props = {
  bookId: string;
};

const PdfReader = ({ bookId }: Props) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const pdfUrl = `${backendUrl}/api/books/read/${bookId}`;

  return (
    <main className="min-h-screen bg-gray-100 pt-24 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#DA3D20] text-white rounded"
            >
              Open PDF
            </a>

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

        {/* PDF Viewer */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <iframe
            src={pdfUrl}
            title="PDF Reader"
            className="w-full h-[80vh] min-h-[600px]"
          />
        </div>
      </div>
    </main>
  );
};

export default PdfReader;
