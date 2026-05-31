import { api } from "../api";

export interface UpdateUser {
  guardian_name: string
  email: string
}

interface UpdateResponse {
  status_code: number
  user: {
    guardian_name: string
    email: string
    profile_picture: string
    id_guardian: number
  }
}

export interface ResponseUser {
  status_code: number,
  user: [
    {
      id_guardian: number,
      guardian_name: string,
      email: string,
      profile_picture: string,
      active: number
    }
  ]
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

export const getUser = async (): Promise<ResponseUser> => {
  const response = await api.get<ResponseUser>("/user");
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


export const updatePicture = async (data: FormData): Promise<any> => {
  const response = await api.patch<any>("/user/profile-picture", data);
  return response.data;
};