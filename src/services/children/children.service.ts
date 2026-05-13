import { api } from "../api"

export const getChild = async (id: number): Promise<any> => {
  const response = await api.get<any>(`/child/${id}`);
  return response.data;
};

export const getChildren = async (): Promise<any> => {
  const response = await api.get<any>(`/child/user/child`);
  return response.data;
};

export const getChildDeactivate = async (): Promise<any> => {
  const response = await api.get<any>(`/user/child/deactivate`);
  return response.data;
};

export const insertChild = async (data: any): Promise<any> => {
  const response = await api.post<any>(`/child`, data);
  return response.data;
};

export const updateChild = async (data: any, childId: number): Promise<any> => {
  const response = await api.post<any>(`/child/${childId}`, data);
  return response.data;
};

export const deactivateChild = async (childId: number): Promise<any> => {
  const response = await api.post<any>(`/child/deactivate/${childId}`);
  return response.data;
};

export const reactivateChild = async (childId: number): Promise<any> => {
  const response = await api.post<any>(`/child/reactivate/${childId}`);
  return response.data;
};