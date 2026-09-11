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

const ReaderPage = () => {
  return <PdfReader />;
};

export default ReaderPage;
