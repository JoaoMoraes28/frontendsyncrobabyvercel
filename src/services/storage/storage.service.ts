import { api } from "../api"

export interface ProducStorage {
    id_stock_register: number
    description: string | null
    quantity: number
    volume: number
    fk_id_child: number
    product: string
}

export interface InsertProduct {
    description: string | null
    quantity: number
    volume: number
    fk_id_child: number
    fk_id_product: number
}

export interface Products {
    id_product: number
    product_name: string
    fk_id_unit: number
    fk_id_product_type: number
}

export interface TypeProduct {
    id_product_type: number
    product_type_name: string
}

export interface ResponseGetStorage {
    status_code: number
    stock: ProducStorage[]
}

interface ResponseInsertStorage {
    status_code: number
}

interface ResponseDeleteStorage {
    status_code: number
}

export const getProductsIdChild = async (childId: number): Promise<ResponseGetStorage> => {
    const response = await api.get<ResponseGetStorage>(`/stock/child/${childId}`);
    return response.data;
};

export const insertProduct = async (data: InsertProduct): Promise<ResponseInsertStorage> => {
    const response = await api.post<ResponseInsertStorage>("/stock", data);
    return response.data;
};

export const deleteProduct = async (productId: number): Promise<ResponseDeleteStorage> => {
    const response = await api.delete<ResponseDeleteStorage>(`/stock/${productId}`);
    return response.data;
};