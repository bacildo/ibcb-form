import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MessageForm from "./pages/MessageForm";
import ThankYou from "./pages/ThankYou"; 
import Login from "./pages/Login";
import FirstAccess from "./pages/FirstAccess"; 
import ChangePassword from "./pages/ChangePassword"; 
import Home from "./pages/Home"; 
import AllMessages from "./pages/AllMessages";

import PrivateRoute from "./components/PrivateRoute"; // seu guard

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* público */}
        <Route path="/" element={<MessageForm />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/first-access"
          element={
            <PrivateRoute>
              <FirstAccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/change-password"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <PrivateRoute>
              <AllMessages />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
