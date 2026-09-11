// "use client";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Book {
//   _id: string;
//   title: string;
//   author: string;
//   description: string;
//   coverImage: string;
// }

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";

//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!query) return;

//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(
//           `https://ebook-library-wbmv.onrender.com/api/books?search=${encodeURIComponent(query)}`,
//         );
//         const data = await res.json();
//         setBooks(Array.isArray(data.books) ? data.books : []); // ✅ use data.books
//       } catch (err) {
//         console.error(err);
//         setBooks([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [query]);

//   return (
//     <div className="p-8 max-w-5xl mx-auto pt-32 sm:pt-24 flex flex-col justify-center items-center">
//       <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

//       {loading && <p>Loading...</p>}
//       {!loading && books.length === 0 && <p>No books found.</p>}

//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-red-300 items-center"> */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center bg-red-300"> */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
//       <div className="w-full flex flex-wrap justify-center gap-6">
//         {books.map((book) => {
//           console.log("BOOK:", book);

//           return (
//             <div
//               key={book._id}
//               // className="p-4 shadow-sm hover:shadow-md transition"
//               className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"
//             >
//               {/* <h2 className="text-lg font-semibold mb-2">{book.title}</h2>
//             <p className="text-gray-600 mb-2">Author: {book.author}</p>
//             <p className="text-gray-700">{book.description}</p>
//             <p className="text-gray-700">{book.description}</p> */}
//               {/* <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"> */}
//               {/* Image */}
//               <img
//                 // src={`https://ebook-library-wbmv.onrender.com/uploads/${book.coverImage}`}
//                 src={book.coverImage}
//                 alt={book.title}
//                 className="w-20 h-28 object-cover rounded-md"
//               />

//               {/* Content */}
//               <div className="flex flex-col">
//                 <div>
//                   <h2 className="text-md md:text-lg font-semibold text-[#DA3D20] line-clamp-2">
//                     {book.title}
//                   </h2>
//                   <p className="text-sm md:text-md text-gray-700 mt-1 font-bold">
//                     {book.author}
//                   </p>
//                 </div>

//                 <Link
//                   href={`/book/${book._id}`}
//                   className="inline-block mt-1 md:mt-4 py-2 px-2 w-20 text-xs border border-[#F8843F] text-[#F8843F] rounded-md hover:bg-[#f7772d] hover:text-white transition"
//                 >
//                   Read more
//                 </Link>
//               </div>
//               {/* </div> */}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Book {
//   _id: string;
//   title: string;
//   author: string;
//   description: string;
//   coverImage: string;
// }

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";

//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!query.trim()) {
//       setBooks([]);
//       return;
//     }

//     const controller = new AbortController();

//     const fetchBooks = async () => {
//       setLoading(true);

//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?search=${encodeURIComponent(query.trim())}`,
//           {
//             signal: controller.signal,
//           },
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch books");
//         }

//         const data = await res.json();

//         setBooks(Array.isArray(data.books) ? data.books : []);
//       } catch (err: any) {
//         if (err.name !== "AbortError") {
//           console.error("Search error:", err);
//           setBooks([]);
//         }
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchBooks();

//     return () => {
//       controller.abort();
//     };
//   }, [query]);

//   return (
//     <div className="p-8 max-w-5xl mx-auto pt-32 sm:pt-24 flex flex-col justify-center items-center">
//       <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

//       {loading && <p>Loading...</p>}

//       {!loading && books.length === 0 && query && <p>No books found.</p>}

//       <div className="w-full flex flex-wrap justify-center gap-6">
//         {books.map((book) => (
//           <div
//             key={book._id}
//             className="w-full max-w-sm bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"
//           >
//             <img
//               src={book.coverImage}
//               alt={book.title}
//               className="w-20 h-28 object-cover rounded-md"
//             />

//             <div className="flex flex-col">
//               <div>
//                 <h2 className="text-md md:text-lg font-semibold text-[#DA3D20] line-clamp-2">
//                   {book.title}
//                 </h2>

//                 <p className="text-sm md:text-md text-gray-700 mt-1 font-bold">
//                   {book.author}
//                 </p>
//               </div>

//               <Link
//                 href={`/book/${book._id}`}
//                 className="inline-block mt-1 md:mt-4 py-2 px-2 w-20 text-xs border border-[#F8843F] text-[#F8843F] rounded-md hover:bg-[#f7772d] hover:text-white transition"
//               >
//                 Read more
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// "use client";

// import Link from "next/link";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// interface Book {
//   _id: string;
//   title: string;
//   author: string;
//   description: string;
//   coverImage: string;
// }

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const query = searchParams.get("query") || "";

//   const [search, setSearch] = useState(query);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Keep input updated when URL query changes
//   useEffect(() => {
//     setSearch(query);
//   }, [query]);

//   // Search books
//   useEffect(() => {
//     if (!query.trim()) {
//       setBooks([]);
//       return;
//     }

//     const controller = new AbortController();

//     const fetchBooks = async () => {
//       setLoading(true);

//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?search=${encodeURIComponent(
//             query.trim(),
//           )}`,
//           {
//             signal: controller.signal,
//           },
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch books");
//         }

//         const data = await res.json();

//         setBooks(Array.isArray(data.books) ? data.books : []);
//       } catch (err: any) {
//         if (err.name !== "AbortError") {
//           console.error("Search error:", err);
//           setBooks([]);
//         }
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchBooks();

//     return () => {
//       controller.abort();
//     };
//   }, [query]);

//   // Handle search input
//   const handleSearch = (value: string) => {
//     setSearch(value);

//     const trimmedValue = value.trim();

//     if (trimmedValue) {
//       router.push(`/search?query=${encodeURIComponent(trimmedValue)}`);
//     } else {
//       router.push("/search");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 pt-32 sm:pt-24">
//       {/* Search Section */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="h-10 flex items-center border border-gray-300 bg-white px-4 rounded-lg w-full max-w-md focus-within:border-[#F8843F] transition">
//           <input
//             type="text"
//             placeholder="Search books"
//             value={search}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="flex-1 outline-none font-medium text-sm text-gray-700 placeholder:text-gray-400"
//           />

//           <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-sm" />
//         </div>
//       </div>

//       {/* Heading */}
//       {query && (
//         <h1 className="text-xl md:text-2xl font-bold mb-6">
//           Search Results for "{query}"
//         </h1>
//       )}

//       {/* Loading */}
//       {loading && (
//         <div className="flex justify-center py-10">
//           <p className="text-gray-500">Searching...</p>
//         </div>
//       )}

//       {/* No Results */}
//       {!loading && books.length === 0 && query && (
//         <div className="text-center py-10">
//           <p className="text-gray-500">No books found.</p>
//         </div>
//       )}

//       {/* Books */}
//       {!loading && books.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {books.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"
//             >
//               <img
//                 src={book.coverImage}
//                 alt={book.title}
//                 className="w-20 h-28 object-cover rounded-md"
//               />

//               <div className="flex flex-col min-w-0">
//                 <h2 className="text-md md:text-lg font-semibold text-[#DA3D20] line-clamp-2">
//                   {book.title}
//                 </h2>

//                 <p className="text-sm text-gray-700 mt-1 font-bold">
//                   {book.author}
//                 </p>

//                 <Link
//                   href={`/book/${book._id}`}
//                   className="inline-block mt-auto md:mt-4 py-2 px-2 w-20 text-center text-xs border border-[#F8843F] text-[#F8843F] rounded-md hover:bg-[#F8843F] hover:text-white transition"
//                 >
//                   Read more
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchPage;

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
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    const controller = new AbortController();

    const fetchBooks = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books?search=${encodeURIComponent(
            query.trim(),
          )}`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();

        setBooks(Array.isArray(data.books) ? data.books : []);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
          setBooks([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 sm:pt-24">
      {/* Heading */}
      {query && (
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Search Results for "{query}"
        </h1>
      )}

      {/* Empty Search */}
      {!query && (
        <div className="text-center py-10">
          <p className="text-gray-500">
            Search for a book using the search bar above.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <p className="text-gray-500">Searching...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && books.length === 0 && query && (
        <div className="text-center py-10">
          <p className="text-gray-500">No books found for "{query}".</p>
        </div>
      )}

      {/* Books */}
      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-md"
              />

              <div className="flex flex-col min-w-0">
                <h2 className="text-md md:text-lg font-semibold text-[#DA3D20] line-clamp-2">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-700 mt-1 font-bold">
                  {book.author}
                </p>

                <Link
                  href={`/book/${book._id}`}
                  className="inline-block mt-auto md:mt-4 py-2 px-2 w-20 text-center text-xs border border-[#F8843F] text-[#F8843F] rounded-md hover:bg-[#F8843F] hover:text-white transition"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
