import { api } from "../api"

export interface Children {
  id_child: number
  child_name: string
  height: number
  weight: number
  birth_date: string
  BMI: null | number
  blood_type: string
  gender: string
  photo: string
  active: number
  fk_id_guardian: number
}

export interface ResponseChild {
  status_code: number
  children: Children[]
}

export interface ResponseChildId {
  status_code: number
  child: Children[]
}

export interface UpdateChild {
  id_child: number
  child_name: string
  birth_date: string
  blood_type: string
  photo: string
  gender: string
}

export interface ResponseJSONUpdateChild {
  status: boolean
  status_code: number
  response: ResponseUpdateChild
}

export interface ResponseUpdateChild {
  child_name: string
  birth_date: string
  blood_type: string
  photo: string
  gender: string
  fk_id_guardian: number
  id_child: number
}

export interface InsertChild {
  child_name: string
  height: number | null
  weight: number | null
  birth_date: string
  blood_type: string | null
  gender: string
  photo: string | null
}

export interface ResponseInsertChild {
  child_name: string
  height: number
  weight: number
  birth_data: string
  blood_type: string
  gender: string
  photo: string
  fk_id_guardian: number
}

export interface VerifyDesactivate {
  id_child: number
  child_name: string
}

export const getChild = async (id: number): Promise<ResponseChildId> => {
  const response = await api.get<ResponseChildId>(`/child/${id}`);
  return response.data;
};

export const getChildren = async (): Promise<ResponseChild> => {
  const response = await api.get<ResponseChild>(`user/child`);
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

export const updateChild = async (data: UpdateChild, childId: number): Promise<ResponseJSONUpdateChild> => {
  const response = await api.put<ResponseJSONUpdateChild>(`/child/${childId}`, data);
  return response.data;
};

export const deactivateChild = async (childId: number, data: VerifyDesactivate): Promise<any> => {
  const response = await api.patch<any>(`http://localhost:5173/syncrobaby/child/deactivate/${childId}`, data);
  return response.data;
};

export const reactivateChild = async (childId: number): Promise<any> => {
  const response = await api.patch<any>(`/child/reactivate/${childId}`);
  return response.data;
};