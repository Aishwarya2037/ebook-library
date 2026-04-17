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

  if (isLoading) return <p>Loading book details...</p>;

  if (error) return <p>Error loading book.</p>;

  const book = data.book;

  return (
    <div className="max-w-sm md:max-w-2xl mx-auto p-6">
      <Link to="/books" className="text-blue-500 underline mb-4 inline-block">
        {"<"} back
      </Link>

      <div className="border rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4 md:gap-10">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-50 md:w-60 h-70 md:h-70 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-700 mb-4 text-md">
            <b className="text-xl">Author:</b> {book.author}
          </p>
          <p className="text-gray-700 mb-4 text-md">
            <b className="text-xl">Description:</b> {book.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
