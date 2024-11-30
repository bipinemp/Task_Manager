import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Tasks from "./pages/dashboard/Tasks.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import QueryProvider from "./components/QueryProvider.tsx";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/authContext.tsx";
import AuthRedirect from "./components/AuthRedirect.tsx";
import PublicRoute from "./components/PublicRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRedirect />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard/tasks", element: <Tasks /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryProvider>
        <Toaster position="top-center" reverseOrder={true} />
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthContextProvider>
  </StrictMode>
);
