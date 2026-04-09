import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  if (token === "") {
    return <Navigate to={"/auth/login"} replace />;
  } else {
    console.log("token present");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 md:ml-64">
        <Navbar setIsOpen={setIsOpen} />

        <div className="px-6 pt-23 bg-gray-50">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
