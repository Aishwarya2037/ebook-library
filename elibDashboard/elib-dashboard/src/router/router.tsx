import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
// import Authlayout from "../layouts/Authlayout";
import CreateBook from "../pages/CreateBook";
import ViewBook from "../pages/ViewBook";
import EditBook from "../pages/EditBook";
import ProtectedRoute from "../protected/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "books/create",
        element: <CreateBook />,
      },
      {
        path: "books/:id",
        element: <ViewBook />,
      },
      {
        path: "books/edit/:id",
        element: <EditBook />,
      },
    ],
  },

  // {
  //   path: "/auth",
  //   element: <Authlayout />,
  //   children: [
  //     {
  //       path: "login",
  //       element: <LoginPage />,
  //     },
  //     {
  //       path: "register",
  //       element: <RegisterPage />,
  //     },
  //   ],
  // },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
