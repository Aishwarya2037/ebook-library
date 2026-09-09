"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import BookCard from "./BookCard";
import { Book } from "@/src/types";

interface PaginationProps {
  books: Book[];
}

const Pagination = ({ books }: PaginationProps) => {
  const booksPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  const currentBooks = books.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Create professional page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      {/* Books */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {currentBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Showing count */}
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {startIndex + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(endIndex, books.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">{books.length}</span>{" "}
            books
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            {/* Previous */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-lg border border-gray-200
                bg-white text-gray-600
                transition-all duration-200
                hover:border-[#F8843F]
                hover:text-[#F8843F]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:border-gray-200
                disabled:hover:text-gray-600
              "
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="
                      flex h-10 w-8 items-center
                      justify-center text-sm
                      text-gray-400
                    "
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      currentPage === page
                        ? "bg-[#F8843F] text-white shadow-sm"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-[#F8843F] hover:text-[#F8843F]"
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="
                flex h-10 w-10 items-center justify-center
                rounded-lg border border-gray-200
                bg-white text-gray-600
                transition-all duration-200
                hover:border-[#F8843F]
                hover:text-[#F8843F]
                disabled:cursor-not-allowed
                disabled:opacity-40
                disabled:hover:border-gray-200
                disabled:hover:text-gray-600
              "
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
