import { getCookie, setCookie, deleteCookie } from "cookies-next/client";

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.accessToken;
};

const setUser = (user) => {
  setCookie("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400),
  });
};

const getUser = () => {
  return JSON.parse(getCookie("user"));
};

const removeUser = () => {
  deleteCookie("user", { path: "/" });
};

const TokenServices = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default TokenServices;
