// export const dynamic = "force-dynamic";

// import { Suspense } from "react";
// import Banner from "./components/banner";
// import { BookList } from "./components/BookList";
// import Loading from "@/src/components/Loading";

// export default async function Home() {
//   return (
//     <main className="mt-20">
//       <Banner />
//       <Suspense fallback={<Loading />}>
//         <BookList />
//       </Suspense>
//     </main>
//   );
// }

export const dynamic = "force-dynamic";

import Banner from "./components/banner";
import BookCard from "./components/BookCard";
import { Book } from "@/src/types";

export default async function Home() {
  let books: Book[] = [];

  try {
    const response = await fetch(
      "https://ebook-library-wbmv.onrender.com/api/books?all=true",
      {
        cache: "no-store",
      },
    );

    if (response.ok) {
      const data = await response.json();
      books = data.books || [];
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return (
    <main className="-mt-36">
      <Banner />

      <div className="max-w-6xl mx-auto mt-6 px-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
        {books.length > 0 ? (
          books.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p>No books found</p>
        )}
      </div>
    </main>
  );
}
