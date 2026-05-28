import { api } from "../api";

export interface AllVaccine {
    id_vaccine: number,
    vaccine_name: string,
    observation: string,
    prevented_diseases: string,
    dose: string
}

export interface ResponseGetAllVaccine {
    status_code: number
    vaccine: AllVaccine[]
}

export interface VaccineStatus {
    id_vaccine: number,
    vaccine: string,
    observation: string,
    prevented_diseases: string,
    dose: string,
    application_status: number,
    application_date: string,
    id_child: number
}

export interface ResponseGetVaccineStatus {
    status_code: number,
    vaccine: VaccineStatus[]
}

export interface VaccineAgeGroup {
    id_vaccine: number,
    vaccine: string,
    observation: string,
    prevented_diseases: string,
    dose: string,
    id_age_group: number,
    age_group_name: string    
}

export interface ResponseGetVaccineAgeGroup {
    status_code: number,
    vaccine: VaccineAgeGroup[]
}

export interface UpdateVaccine {
    application_status: number,
    application_date: string,
    fk_id_child: number,
    fk_id_vaccine: number
}

export interface ResponsePutVaccine {
    status_code: number,
    vaccine: UpdateVaccine
}

export const getAllVaccine = async (): Promise<ResponseGetAllVaccine> => {
    try {
        const response = await api.get<ResponseGetAllVaccine>(`/vaccine`);
        return response.data;

    } catch (error: any) {
        if (String(error).includes("404")) {
            return {
                status_code: 404,
                vaccine: []
            }
        }
        throw error
    }
};

export const getVaccineByStatus = async (status: number, child: number): Promise<ResponseGetVaccineStatus> => {
    try {
        const response = await api.get<ResponseGetVaccineStatus>(`/vaccine/status?status=${status}&child=${child}`);
        return response.data;

    } catch (error: any) {
        if (String(error).includes("404")) {
            return {
                status_code: 404,
                vaccine: []
            }
        }
        throw error
    }
};


export const getVaccineByAgeGroup = async (child: number, age: number): Promise<ResponseGetVaccineAgeGroup> => {
    try {
        const response = await api.get<ResponseGetVaccineAgeGroup>(`/vaccine/age?child=${child}&age=${age}`);
        return response.data;

    } catch (error: any) {
        if (String(error).includes("404")) {
            return {
                status_code: 404,
                vaccine: []
            }
        }
        throw error
    }
};

export const updateVaccineStatus = async (data: UpdateVaccine): Promise<ResponsePutVaccine> => {
    const response = await api.put<ResponsePutVaccine>(`/vaccine/status`, data);
    return response.data;
};