// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getBookById } from "../api/axios";

// const ViewBook = () => {
//   const { id } = useParams();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["book", id],
//     queryFn: () => getBookById(id!),
//     enabled: !!id,
//   });

//   if (isLoading) return <p>Loading book details...</p>;

//   if (error) return <p>Error loading book.</p>;

//   const book = data.book;

//   return (
//     <div className="max-w-sm md:max-w-2xl mx-auto p-6">
//       <Link to="/books" className="text-blue-500 underline mb-4 inline-block">
//         {"<"} back
//       </Link>

//       <div className="border rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4 md:gap-10">
//         <img
//           src={book.coverImage}
//           alt={book.title}
//           className="w-50 md:w-60 h-70 md:h-70 object-cover rounded-lg"
//         />
//         <div className="flex flex-col">
//           <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
//           <p className="text-gray-700 mb-4 text-md">
//             <b className="text-xl">Author:</b> {book.author}
//           </p>
//           <p className="text-gray-700 mb-4 text-md">
//             <b className="text-xl">Description:</b> {book.description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewBook;

import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../api/axios";

const ViewBook = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>Error loading book.</p>;
  }

  const book = data.book;

  // const handleReadBook = () => {
  //   window.open(book.pdfFile, "_blank", "noopener,noreferrer");
  // };

  // const handleReadBook = () => {
  //   window.open("https://www.google.com", "_blank");
  // };

  // const handleReadBook = () => {
  //   console.log("PDF URL:", book.pdfFile);

  //   const newTab = window.open(book.pdfFile, "_blank");

  //   if (!newTab) {
  //     alert("Browser blocked the new tab. Please allow pop-ups for this site.");
  //   }
  // };

  // const handleReadBook = () => {
  //   window.open(`http://localhost:3100/api/books/read/${book._id}`, "_blank");
  // };
  const handleReadBook = () => {
    const readUrl = `${import.meta.env.VITE_BACKEND_URL}/books/read/${book._id}`;

    window.open(readUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/books"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {"<"} Back to Books
          </Link>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">Book Details</h1>

        <p className="text-sm text-gray-500 mt-1">
          View the details of this book
        </p>
      </div>

      {/* Book Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-52 h-72 object-cover rounded-xl shadow-sm"
            />
          </div>

          {/* Book Information */}
          <div className="flex-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-5">
              {book.title}
            </h2>

            {/* Author */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Author</p>

              <p className="text-lg text-gray-800">{book.author}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500 mb-1">
                Description
              </p>

              <p className="text-gray-700 leading-6">
                {book.description || "No description available."}
              </p>
            </div>

            {/* Read Book Button */}
            <button
              onClick={handleReadBook}
              className="inline-block cursor-pointer px-5 py-2.5 rounded-lg bg-[#DA3D20] text-white font-semibold hover:bg-[#ca3217] transition"
            >
              Read Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
