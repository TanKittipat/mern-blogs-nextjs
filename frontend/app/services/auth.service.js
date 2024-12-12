import api from "./api";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL + "/auth";

const register = async (username, password) => {
  return await api.post(apiUrl + "/register", { username, password });
};

const AuthService = {
  register,
};

export default AuthService;
