import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { router } from "./navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";
import axios from "axios";
import { apiUrl } from "./constants/apiUrl";

axios.defaults.baseURL = apiUrl;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
);
