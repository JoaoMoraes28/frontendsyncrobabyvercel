import { api } from "../api";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
    status_code: number
    user: Array<{
      id_guardian: number;
      guardian_name: string;
      email: string;
      profile_picture: string;
      active: number;
      token: string;
    }>;
}

export interface RegisterData {
  email: string;
  guardian_name: string;
  password: string;
}

export interface RegisterResponse {
  development: string;
  api_description: string;
  request_date: string;
  response: {
    email: string;
    guardian_name: string;
    password: string;
  };
  status: boolean;
  status_code: number;
}

export const loginService = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/user", data);
  return response.data;
};

export const registerService = async (
  data: RegisterData,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/user", data);
  return response.data;
};
