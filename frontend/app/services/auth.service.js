import api from "./api";
import { setCookie, deleteCookie } from "cookies-next/client";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL + "/auth";

const register = async (username, password) => {
  return await api.post(apiUrl + "/register", { username, password });
};

const login = async (username, password) => {
  const res = await api.post(apiUrl + "/login", { username, password });
  const { status, data } = res;
  if (status === 200) {
    if (data.accessToken) {
      setCookie("accessToken", data.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 86400),
      });
      setCookie("user", data);
    }
  }
  return res;
};

const logout = () => {
  deleteCookie("accessToken", { path: "/" });
  deleteCookie("user", { path: "/" });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
