import axios from "axios";
import TokenServices from "./token.service";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use((config) => {
  const token = TokenServices.getLocalAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

export default instance;
