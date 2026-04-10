import { Book } from "@/src/types";
import Link from "next/link";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4">
      {/* Image */}
      <img
        src={`https://ebook-library-1.onrender.com/uploads/${book.coverImage}`}
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
    </div>
  );
};

export default BookCard;
