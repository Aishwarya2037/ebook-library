import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faEdit,
  faTrash,
  faEye,
  // faChevronLeft,
  // faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/axios";
import type { Book } from "../types/type";
import { Link } from "react-router-dom";
import useDeleteBook from "../hooks/useDeleteBook";

const BookPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // without page
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["books"],
  //   queryFn: getBooks,
  //   staleTime: 10000,
  // });

  // with page
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["books", page, search],
  //   queryFn: () => getBooks(page, search),
  //   staleTime: 10000,
  //   placeholderData: undefined,
  // });
  const { data, isLoading, error } = useQuery({
    queryKey: ["books", page, search],
    queryFn: () => getBooks(page, search),
    staleTime: 0,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });

  const { mutate: deleteBookById, isPending } = useDeleteBook();

  console.log("books response:", data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Book List</h1>

        <div className="flex gap-3 items-center">
          <Link
            to="/books/create"
            className="h-10 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700 flex gap-1 items-center font-semibold"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Add Book</span>
          </Link>

          <div className="h-10 flex items-center border border-gray-300 bg-white px-4 rounded w-72">
            <input
              type="text"
              placeholder="Search contact"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="flex-1 outline-none font-semibold"
            />
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-gray-100 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-md border border-gray-100 ">
          <thead className="bg-slate-100 text-gray-600 border-b border-gray-200">
            <tr>
              <th></th>
              <th className="px-6 py-3 text-start">ID</th>
              <th className="px-6 py-3 text-start">Title</th>
              <th className="px-6 py-3 text-start">Author</th>
              <th className="px-6 py-3 text-start">Created At</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody key={page}>
            {/* {paginatedUsers.map((user) => ( */}
            {data?.books?.map((book: Book, index: number) => {
              console.log("PAGE:", page);
              console.log("TITLE:", book.title);
              console.log("IMAGE:", book.coverImage);
              return (
                <tr
                  key={book._id}
                  className="h-16 hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-3 py-2 min-w-[70px] align-middle">
                    <img
                      alt={book.title}
                      src={`https://ebook-library-wbmv.onrender.com/api/uploads/${book.coverImage}`}
                      // src={`http://localhost:3100/uploads/${book.coverImage}`}
                      className="w-14 h-14 rounded-md object-cover"
                      loading="eager"
                    />
                  </td>
                  <td className="px-6 py-3">{(page - 1) * 5 + index + 1}</td>
                  <td className="px-6 py-3">{book.title}</td>
                  <td className="px-6 py-3">{book.author}</td>
                  <td className="px-6 py-3">{book.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* Edit */}
                      {/* <FontAwesomeIcon icon={faEdit} className="text-orange-400" /> */}
                      <Link
                        to={`/books/edit/${book._id}`}
                        className="text-orange-400"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>

                      {/* View */}
                      <Link
                        to={`/books/${book._id}`}
                        className="text-white px-3 py-1 rounded"
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-green-400"
                        />
                      </Link>

                      {/* delete */}
                      <button
                        onClick={() => {
                          if (window.confirm("Delete this book?")) {
                            deleteBookById(book._id);
                          }
                        }}
                        disabled={isPending}
                        className="text-red-500"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="bg-blue-700 text-white font-bold px-4 py-2 border rounded-full disabled:opacity-50"
        >
          {"<"}
        </button>

        <span>
          Page {data?.currentPage} of {data?.totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === data?.totalPages}
          className="bg-blue-700 text-white font-bold px-4 py-2 border rounded-full disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default BookPage;
