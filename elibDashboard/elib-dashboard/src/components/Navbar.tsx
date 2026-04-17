import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import myProfile from "../assets/userProfile.jpg";

import { useNavigate } from "react-router-dom";

type NavbarProps = {
  setIsOpen: (value: boolean) => void;
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="
        h-16 bg-white flex items-center justify-between
        px-3 sm:px-6 shadow fixed top-0 left-0 md:left-64 right-0
      "
    >
      {/* LEFT */}
      {/* <div className="flex gap-3">
        <div className="flex items-center gap-3 sm:gap-4 md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-gray-600 text-lg sm:text-xl"
          />
        </div>

        
        <div className="flex items-center font-semibold border border-gray-100 px-4 py-2 rounded w-70">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          <input
            placeholder="Search..."
            className="outline-none ml-2 text-sm w-full"
          />
        </div>
      </div> */}
      <div className="px-4 py-3 flex items-center">
        {/* Hamburger button only mobile */}
        <button
          className="md:hidden border p-1 rounded bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>

        <h1 className="ml-4 text-xl font-semibold">Dashboard</h1>
      </div>

      {/* PROFILE + DROPDOWN */}
      <div className="relative">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src="/images/profile.jpg"
            alt="p"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-medium">John Doe</p>
          </div>

          {/* ARROW */}
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`
             text-gray-500 text-xs transition-transform duration-200
              ${open ? "rotate-90" : "rotate-0"}
            `}
          />
        </div>

        {/* SUBMENU */}
        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md border border-gray-200">
            <NavLink to="/auth/login">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Sign Out
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
