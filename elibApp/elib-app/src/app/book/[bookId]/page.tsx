import { Book } from "@/src/types";
import DownloadButton from "./components/DownloadButton";

type PageProps = {
  params: Promise<{
    bookId: string;
  }>;
};

const SingleBookPage = async ({ params }: PageProps) => {
  const { bookId } = await params;
  // console.log("BOOK ID FROM PARAMS:", bookId);

  // console.log("BOOK ID:", bookId);
  // console.log("URL:", `${process.env.BACKEND_URL}/books/${bookId}`);

  let book: Book | null = null;

  try {
    const response = await fetch(
      `https://ebook-library-wbmv.onrender.com/api/books/${bookId}`,
      {
        next: { revalidate: 60 },
      },
    );
    if (!response.ok) {
      // throw new Error("Error fetching book");
      // console.log("STATUS:", response.status);
      // console.log("STATUS TEXT:", response.statusText);
      throw new Error(`Error fetching book: ${response.status}`);
    }

    // book = await response.json();
    const data = await response.json();
    book = data.book;
  } catch (err: any) {
    console.error("FETCH ERROR:", err);
    throw err;
    // throw new Error("Error fetching book");
  }

  if (!book) {
    // throw new Error("Book not found");
    return <div>Book not found</div>;
  }

  console.log("BOOK DATA:", book);
  console.log("COVER IMAGE:", book.coverImage);
  console.log("PDF FILE:", book.pdfFile);

  return (
    <div className="pt-32 sm:pt-24 h-auto flex items-start justify-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-xl text-gray-600">{book.author}</p>
          <p>{book.description}</p>
          <DownloadButton fileLink={book.pdfFile} />
        </div>

        {/* Right section */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-auto h-72 object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleBookPage;
