"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [search, setSearch] = useState(""); // to store input value
  const router = useRouter(); // for programmatic navigation

  const handleSearch = () => {
    if (!search.trim()) return; // prevent empty searches
    router.push(`/search?query=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT - LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="40"
              height="40"
              fill="none"
            >
              <path
                d="M8 12C8 10.9 8.9 10 10 10H28C31.3 10 34 12.7 34 16V52C34 48.7 31.3 46 28 46H10C8.9 46 8 46.9 8 48V12Z"
                fill="#DA3D20"
              />
              <path
                d="M56 12C56 10.9 55.1 10 54 10H36C32.7 10 30 12.7 30 16V52C30 48.7 32.7 46 36 46H54C55.1 46 56 46.9 56 48V12Z"
                fill="#F8843F"
              />
            </svg>

            <span className="text-xl font-bold uppercase tracking-tight">
              e-Library
            </span>
          </Link>

          {/* RIGHT - DESKTOP BUTTONS */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="border border-gray-300 px-3 py-2 rounded-md outline-none"
            />

            <button
              onClick={handleSearch}
              className="bg-[#F8843F] text-white px-4 py-2 rounded-md"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
