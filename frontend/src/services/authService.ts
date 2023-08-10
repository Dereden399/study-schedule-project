import { AuthCred } from "../types";
import axios from "./apiClient";

export interface LoginResponse {
  username: string;
  id: string;
  token: string;
}

export interface RegisterResponse {
  username: string;
  id: string;
}

const login = async (cred: AuthCred) => {
  const response = await axios.post<LoginResponse>("/login", cred);
  return response.data;
};

const register = async (cred: AuthCred) => {
  const response = await axios.post<RegisterResponse>("/users", cred);
  return response.data;
};

const check = async (token: string) => {
  const response = await axios.post<{ username: string; id: string }>(
    "/login/check",
    { token: token }
  );
  return { ...response.data, token: token } as LoginResponse;
};

export default { login, register, check };
