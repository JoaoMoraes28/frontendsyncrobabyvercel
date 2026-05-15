import { api } from "../api";

interface InsertIllness {
  illness_name: string
  start_time: string
  end_time: string | null
  description: string | null
  illness_type: string
  medication: string | null
  fk_id_child: number
}

export const getIllness= async (childId: number): Promise<any> => {
  const response = await api.get<any>(`/illness/child/${childId}`);
  return response.data;
};

export const getIllnessId= async (idIllness: number): Promise<any> => {
  const response = await api.get<any>(`/illness/${idIllness}`);
  return response.data;
};

export const getIllnessType= async (type: number): Promise<any> => {
  const response = await api.get<any>(`/illness/type/${type}`);
  return response.data;
};

export const insertIllness = async (data: InsertIllness): Promise<any> => {
  const response = await api.post<any>(`/illness`, data);
  return response.data;
};

export const updateIllness = async (data: number, idIllness: number): Promise<any> => {
  const response = await api.put<any>(`/illness/${idIllness}`, data);
  return response.data;
};

export const deleteIllness = async (idIllness: number): Promise<any> => {
  const response = await api.delete<any>(`/illness/${idIllness}`);
  return response.data;
};