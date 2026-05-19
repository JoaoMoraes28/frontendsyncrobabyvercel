import { api } from "../api";

export interface Diary {
    "id_diary_note": number,
    "title": string,
    "content": string,
    "media": string,
    "date": string,
    "color": string,
    "fk_id_child": number
}

export interface InsertDiary {
    "title": string,
    "content": string,
    "media": string,
    "date": string,
    "color": string,
    "fk_id_child": number
}

export interface ResponseDiary {
    status_code: number
    diary: Diary[];
}

export interface ResponseUpdateDiary {
    status_code: number
    diary: InsertDiary;
}

export interface ResponseInsertDiary {
    status_code: number
}

export interface ResponseDeleteDiary {
    status_code: number
    message: string;
}

export const getDiary = async (
  childId: number,
): Promise<ResponseDiary> => {
  const response = await api.get<ResponseDiary>(
    `/diary/child/${childId}`,
  );
  return response.data;
};


export const insertDiary = async (
  data: InsertDiary,
): Promise<ResponseInsertDiary> => {
  const response = await api.post<ResponseInsertDiary>(
    `/diary`,
    data,
  );
  return response.data;
};


export const updateDiary = async (
  data: InsertDiary,
  idDiary: number,
): Promise<ResponseUpdateDiary> => {
  const response = await api.put<ResponseUpdateDiary>(
    `/diary/${idDiary}`,
    data,
  );
  return response.data;
};

export const deleteDiary = async (
  idDiary: number,
): Promise<ResponseDeleteDiary> => {
  const response = await api.delete<ResponseDeleteDiary>(
    `/professional/${idDiary}`,
  );
  return response.data;
};