import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx";
import MessageForm from "./pages/MessageForm.jsx";
import Register from "./pages/Register.jsx";
import ThankYou from "./pages/ThankYou.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/messages",
    element: <MessageForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/thank-you",
    element: <ThankYou />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
