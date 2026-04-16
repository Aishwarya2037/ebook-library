"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://ebook-library-wbmv.onrender.com/api/books?search=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setBooks(Array.isArray(data.books) ? data.books : []); // ✅ use data.books
      } catch (err) {
        console.error(err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="p-8 max-w-5xl mx-auto mt-20 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 && <p>No books found.</p>}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-red-300 items-center"> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center bg-red-300"> */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <div className="w-full flex flex-wrap justify-center gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            // className="p-4 shadow-sm hover:shadow-md transition"
            className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"
          >
            {/* <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">Author: {book.author}</p>
            <p className="text-gray-700">{book.description}</p>
            <p className="text-gray-700">{book.description}</p> */}
            {/* <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"> */}
            {/* Image */}
            <img
              // src={`https://ebook-library-wbmv.onrender.com/uploads/${book.coverImage}`}
              src={book.coverImage}
              alt={book.title}
              className="w-20 h-28 object-cover rounded-md"
            />

            {/* Content */}
            <div className="flex flex-col">
              <div>
                <h2 className="text-md md:text-lg font-semibold text-[#DA3D20] line-clamp-2">
                  {book.title}
                </h2>
                <p className="text-sm md:text-md text-gray-700 mt-1 font-bold">
                  {book.author}
                </p>
              </div>

              <Link
                href={`/book/${book._id}`}
                className="inline-block mt-1 md:mt-4 py-2 px-2 w-20 text-xs border border-[#F8843F] text-[#F8843F] rounded-md hover:bg-[#f7772d] hover:text-white transition"
              >
                Read more
              </Link>
            </div>
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
