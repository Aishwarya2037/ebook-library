// export const dynamic = "force-dynamic";

// import { Book } from "@/src/types";
// import BookCard from "./BookCard";

// export const BookList = async () => {
//   const response = await fetch("https://ebook-library-1.onrender.com/api/books?all=true");

//   if (!response.ok) {
//     throw new Error("An error occurred while fetching the books");
//   }

//   const data = await response.json();
//   const books = data.books;

//   return (
//     <div className="max-w-6xl mx-auto mt-6 px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
//       {books?.length > 0 ? (
//         books.map((book: Book) => <BookCard key={book._id} book={book} />)
//       ) : (
//         <p>No books found</p>
//       )}
//     </div>
//   );
// };



// export const dynamic = "force-dynamic";

// import { Book } from "@/src/types";
// import BookCard from "./BookCard";

// export const BookList = async () => {
//   let books: Book[] = [];

//   try {
//     const response = await fetch(
//       "https://ebook-library-1.onrender.com/api/books?all=true",
//       {
//         cache: "no-store",
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       books = data.books || [];
//     }
//   } catch (error) {
//     console.error("Error fetching books:", error);
//   }

//   return (
//     <div className="max-w-6xl mx-auto mt-6 px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
//       {books.length > 0 ? (
//         books.map((book: Book) => (
//           <BookCard key={book._id} book={book} />
//         ))
//       ) : (
//         <p>No books found</p>
//       )}
//     </div>
//   );
// };
