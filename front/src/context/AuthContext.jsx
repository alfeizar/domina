/* eslint-disable no-unused-vars */
import { tokenLocalStorage } from "@/constants/localStorage";
import { setToken } from "@/store/userSlice";
import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = (props) => {
  const dispatch = useDispatch();

  // ** States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isLogin, setIsLogin] = useState(false);
  const [isVerifyToken, setIsVerifyToken] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  //   ** obtener el usuario por token
  const getUserByToken = useCallback(async () => {
    try {
      setIsLoadingAuth(true);
      setIsVerifyToken(true);
      const token = localStorage.getItem(tokenLocalStorage);
      const { data } = await axios.get("/api/user/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setToken(token));
      setIsLoadingAuth(false);
      setIsVerifyToken(false);
      setUser(data.data);
      setIsLogin(true);
    } catch (error) {
      dispatch(setToken(null));
      setIsLoadingAuth(false);
      setIsVerifyToken(false);
      setUser(null);
      setIsLogin(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getUserByToken();
  }, [getUserByToken]);

  // ** funcion para iniciar sesion
  const handleLogin = useCallback(
    async (params) => {
      try {
        setIsLoadingAuth(true);
        const { data } = await axios.post("/api/user/auth/login", params);
        localStorage.setItem(tokenLocalStorage, data.data.token);
        dispatch(setToken(data.data.token));
        setIsLoadingAuth(false);
        setUser(data.data);
        setIsLogin(true);
        toast.success(data.message);
      } catch (error) {
        dispatch(setToken(null));
        setIsLoadingAuth(false);
        setUser(null);
        setIsLogin(false);
        const messageError = error.response?.data.message || error.message;
        toast.error(messageError);
      }
    },
    [dispatch]
  );

  //   ** funcion para registrar a un usuario
  const handleRegister = useCallback(
    async (params) => {
      try {
        setIsLoadingAuth(true);
        const { data } = await axios.post("/api/user/auth/register", params);
        localStorage.setItem(tokenLocalStorage, data.data.token);
        dispatch(setToken(data.data.token));
        setIsLoadingAuth(false);
        setUser(data.data);
        setIsLogin(true);
        toast.success(data.message);
      } catch (error) {
        dispatch(setToken(null));
        setIsLoadingAuth(false);
        setUser(null);
        setIsLogin(false);
        const messageError = error.response?.data.message || error.message;
        toast.error(messageError);
      }
    },
    [dispatch]
  );

  //   ** funcion para cerrar sesion
  const handleLogout = useCallback(() => {
    localStorage.removeItem(tokenLocalStorage);
    dispatch(setToken(null));
    setUser(null);
    setIsLogin(false);
  }, [dispatch]);

  const values = useMemo(
    () => ({
      isLogin,
      user,
      loading,
      setUser,
      setLoading,
      isLoadingAuth,
      isVerifyToken,
      handleLogin,
      handleLogout,
      handleRegister,
    }),
    [
      handleLogin,
      handleLogout,
      handleRegister,
      isLogin,
      user,
      loading,
      isVerifyToken,
      isLoadingAuth,
    ]
  );

  return <AuthContext.Provider value={values} {...props} />;
};

export { AuthContext, AuthProvider };
