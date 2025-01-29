/* eslint-disable react/prop-types */

import { Navigate } from "react-router";
import { useUser } from "../hooks/useUser";

export const PublicteRoute = ({ children }) => {
  // ** context
  const { isLogin } = useUser();
  return !isLogin ? children : <Navigate to={"/"} />;

  // return isLogin
};
