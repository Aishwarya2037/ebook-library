import PdfReader from "./PdfReader";

type PageProps = {
  params: Promise<{
    bookId: string;
  }>;
};

const ReaderPage = async ({ params }: PageProps) => {
  const { bookId } = await params;

  return <PdfReader bookId={bookId} />;
};

export default ReaderPage;
