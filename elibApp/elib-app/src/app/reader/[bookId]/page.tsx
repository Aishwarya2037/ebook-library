// import PdfReader from "./PdfReader";

// type PageProps = {
//   params: Promise<{
//     bookId: string;
//   }>;
// };

// const ReaderPage = async ({ params }: PageProps) => {
//   const { bookId } = await params;

//   return <PdfReader bookId={bookId} />;
// };

// export default ReaderPage;

// import dynamic from "next/dynamic";

// const PdfReader = dynamic(() => import("./PdfReader"), {
//   ssr: false,
//   loading: () => (
//     <div className="min-h-screen flex items-center justify-center">
//       <p>Loading PDF reader...</p>
//     </div>
//   ),
// });

// type PageProps = {
//   params: Promise<{
//     bookId: string;
//   }>;
// };

// const ReaderPage = async ({ params }: PageProps) => {
//   const { bookId } = await params;

//   return <PdfReader bookId={bookId} />;
// };

// export default ReaderPage;

import PdfReaderWrapper from "./PdfReaderWrapper";

type PageProps = {
  params: Promise<{
    bookId: string;
  }>;
};

const ReaderPage = async ({ params }: PageProps) => {
  const { bookId } = await params;

  return <PdfReaderWrapper bookId={bookId} />;
};

export default ReaderPage;
