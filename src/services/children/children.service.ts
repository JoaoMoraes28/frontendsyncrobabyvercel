import { api } from "../api"

interface ResponseChild {
  id_child: number
  child_name: string
  height: number
  weight: number
  birth_data: string
  BMI: null | number
  blood_type: string
  gender: string
  photo: string
  active: number
  fk_id_guardian: number
}

interface UpdateChild {
  child_name: string
  birth_date: string
  blood_type: string
  photo: string
  gender: string
}

interface ResponseUpdateChild {
  child_name: string
  birth_date: string
  blood_type: string
  photo: string
  gender: string
  fk_id_guardian: number
  id_child: number
}

interface InsertChild {
  child_name: string
  height: number | null
  weight: number | null
  birth_data: string
  blood_type: string | null
  gender: string
  photo: string | null
}

interface ResponseInsertChild {
  child_name: string
  height: number
  weight: number
  birth_data: string
  blood_type: string
  gender: string
  photo: string
  fk_id_guardian: number
}

interface VerifyDesactivate {
  child_name: string
}

export const getChild = async (id: number): Promise<ResponseChild> => {
  const response = await api.get<ResponseChild>(`/child/${id}`);
  return response.data;
};

export const getChildren = async (): Promise<ResponseChild[]> => {
  const response = await api.get<ResponseChild[]>(`/child/user/child`);
  return response.data;
};

export const getChildDeactivate = async (): Promise<ResponseChild[]> => {
  const response = await api.get<ResponseChild[]>(`/user/child/deactivate`);
  return response.data;
};

export const insertChild = async (data: InsertChild): Promise<ResponseInsertChild> => {
  const response = await api.post<ResponseInsertChild>(`/child`, data);
  return response.data;
};

export const updateChild = async (data: UpdateChild, childId: number): Promise<ResponseUpdateChild> => {
  const response = await api.put<ResponseUpdateChild>(`/child/${childId}`, data);
  return response.data;
};

export const deactivateChild = async (childId: number, data: VerifyDesactivate): Promise<any> => {
  const response = await api.post<any>(`/child/deactivate/${childId}`, data);
  return response.data;
};

export const reactivateChild = async (childId: number): Promise<any> => {
  const response = await api.post<any>(`/child/reactivate/${childId}`);
  return response.data;
};