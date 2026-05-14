import { api } from "../api"

interface ResponseRoutines {
    child: number
    time: string
    date: string
    duration: string
    description: string | null
    title: string
    log_type: string
    id: number
}

interface RegisterSleep {
    start_time: string
    end_time: string
    description: string | null
    fk_id_child: number
}

interface ProductId {
    id: number
    quantity_product: number
}

interface RegisterDiaper {
    date_time: string
    type: string
    description: string | null
    fk_id_child: number
    product_id: ProductId[]
}

interface RegisterBath {
    start_time: string
    end_time: string
    description: string | null
    fk_id_child: number
    product_id: ProductId[]
}

interface RegisterMedication {
    date_time: string
    description: string | null
    fk_id_child: number
    product_id: ProductId[]
}

interface RegisterFeeding {
    date_time: string
    description: string | null
    fk_id_child: number
    fk_id_product_type: number
    product_id: ProductId[]
}

export const getRoutines = async (childId: number, date: string): Promise<ResponseRoutines[]> => {
  const response = await api.get<ResponseRoutines[]>(`/routines?child=${childId}&date=${date}`);
  return response.data;
};

export const insertRegisterSleep = async (data: RegisterSleep): Promise<RegisterSleep> => {
  const response = await api.post<RegisterSleep>("/routines/sleep",data);
  return response.data;
};

export const deleteRegisterSleep = async (idRegister: number): Promise<any> => {
  const response = await api.delete<any>(`/routines/sleep/${idRegister}`);
  return response.data;
};

export const insertRegisterDiaper = async (data: RegisterDiaper): Promise<RegisterDiaper> => {
  const response = await api.post<RegisterDiaper>("/routines/diaper", data);
  return response.data;
};

export const deleteRegisterDiaper = async (idRegister: number): Promise<any> => {
  const response = await api.delete<any>(`/routines/diaper/${idRegister}`);
  return response.data;
};

export const insertRegisterBath = async (data: RegisterBath): Promise<RegisterBath> => {
  const response = await api.post<RegisterBath>("/routines/diaper", data);
  return response.data;
};

export const deleteRegisterBath = async (idRegister: number): Promise<any> => {
  const response = await api.delete<any>(`/routines/bath/${idRegister}`);
  return response.data;
};

export const insertRegisterMedication = async (data: RegisterMedication): Promise<RegisterMedication> => {
  const response = await api.post<RegisterMedication>("/routines/medication", data);
  return response.data;
};

export const deleteRegisterMedication = async (idRegister: number): Promise<any> => {
  const response = await api.delete<any>(`/routines/medication/${idRegister}`);
  return response.data;
};

export const insertRegisterFeeding = async (data: RegisterFeeding): Promise<RegisterFeeding> => {
  const response = await api.post<RegisterFeeding>("/routines/feeding", data);
  return response.data;
};