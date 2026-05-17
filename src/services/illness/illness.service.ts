import { api } from "../api";

export interface InsertIllness {
  illness_name: string
  start_date: string
  end_date: string | null
  description: string | null
  illness_type: string
  medication: string | null
  fk_id_child: number
}

export interface Illness {
  id_illness: number
  illness_name: string
  start_date: string
  end_date: string | null
  description: string | null
  illness_type: string
  medication: string | null
  fk_id_child: number
}

export interface ResponseIllness {
  status_code: number
  illness: Illness[]
}

export const getIllness = async (childId: number): Promise<ResponseIllness> => {
  const response = await api.get<ResponseIllness>(`/illness/child/${childId}`);
  return response.data;
};

export const getIllnessId = async (idIllness: number): Promise<ResponseIllness> => {
  const response = await api.get<ResponseIllness>(`http://localhost:5173/syncrobaby/illness/${idIllness}`);
  return response.data;
};

export const getIllnessType = async (type: number): Promise<any> => {
  const response = await api.get<any>(`/illness/type/${type}`);
  return response.data;
};

export const insertIllness = async (data: InsertIllness): Promise<any> => {
  const response = await api.post<any>(`/illness`, data);
  return response.data;
};

export const updateIllness = async (data: Illness, idIllness: number): Promise<ResponseIllness> => {
  const response = await api.put<ResponseIllness>(`http://localhost:5173/syncrobaby/illness/${idIllness}`, data);
  return response.data;
};

export const deleteIllness = async (idIllness: number): Promise<any> => {
  const response = await api.delete<any>(`/illness/${idIllness}`);
  return response.data;
};