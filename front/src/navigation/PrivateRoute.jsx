/* eslint-disable react/prop-types */

import { Navigate } from "react-router";
import { useUser } from "../hooks/useUser";

export const PrivateRoute = ({ children }) => {
  // ** context
  const { isLogin } = useUser();
  return isLogin ? children : <Navigate to={"/auth"} />;
};
