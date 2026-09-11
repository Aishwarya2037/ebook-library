"use client";

import dynamic from "next/dynamic";

const PdfReader = dynamic(() => import("./PdfReader"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading PDF reader...</p>
    </div>
  ),
});

type Props = {
  bookId: string;
};

const PdfReaderWrapper = ({ bookId }: Props) => {
  return <PdfReader bookId={bookId} />;
};

export default PdfReaderWrapper;
