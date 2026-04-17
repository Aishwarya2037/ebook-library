import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBook, faXmark } from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const linkClass = ({ isActive }: any) =>
    `flex items-center gap-3 px-6 py-3 cursor-pointer
     ${isActive ? "bg-gray-100" : "hover:bg-gray-100"}`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white text-black shadow-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block
        `}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2 mt-3 ml-3">
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
        </NavLink>

        {/* MENU */}
        <ul className="mt-6 space-y-1">
          <li>
            <NavLink to="/home" className={linkClass}>
              <FontAwesomeIcon icon={faHouse} />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/books" className={linkClass}>
              <FontAwesomeIcon icon={faBook} />
              Books
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
