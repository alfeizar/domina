import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser debe estar dentro del proveedor");
  }

  return context;
};
