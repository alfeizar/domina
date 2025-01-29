import { AuthPage } from "@/pages/AuthPage";
import { TasksPage } from "@/pages/TasksPage";
import { createBrowserRouter } from "react-router";
import { PublicteRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <TasksPage />
      </PrivateRoute>
    ),
  },

  {
    path: "/auth",
    element: (
      <PublicteRoute>
        <AuthPage />
      </PublicteRoute>
    ),
  },

  // {
  //   path: "/",
  //   element: <TasksPage />,
  // },
]);
