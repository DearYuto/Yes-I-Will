import { apiClient } from "../client/api-client";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

const LOGIN_ENDPOINT = "/auth/login";

const loginService = {
  login: (email: string, password: string) =>
    apiClient.post<LoginResponse>(LOGIN_ENDPOINT, { email, password }),
};

export default loginService;
