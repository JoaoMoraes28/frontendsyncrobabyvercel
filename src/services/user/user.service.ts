import { api } from "../api";
import type { LoginResponse } from "../auth/auth.service"

export interface UpdateUser {
  guardian_name: string
  email: string
  profile_picture: string
}

interface UpdateResponse {
  guardian_name: string
  email: string
  profile_picture: string
  id_guardian: number
}

interface VerifyPassword {
  password: string
}

interface VerifyEmailPass {
  email: string
  password: string
}

interface ResponseReactivate {
  id_guardian: number
  token: string
}

interface UpdatePassword {
  current_password: string
  new_password: string
}

export const getUser = async (): Promise<LoginResponse> => {
  const response = await api.get<LoginResponse>("/user");
  return response.data;
};

export const updateUser = async (data: UpdateUser): Promise<UpdateResponse> => {
  const response = await api.put<UpdateResponse>("/user", data);
  return response.data;
};

export const deactivateUser = async (data: VerifyPassword): Promise<any> => {
  const response = await api.patch<any>("/deactivate/user", data);
  return response.data;
};

export const reactivateUser = async (data: VerifyEmailPass): Promise<ResponseReactivate> => {
  const response = await api.patch<ResponseReactivate>("/reactivate/user", data);
  return response.data;
};

export const updatePassword = async (data: UpdatePassword): Promise<any> => {
  const response = await api.patch<any>("/user/password", data);
  return response.data;
};