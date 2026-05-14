import { api } from "../api"

interface ProducStorage {
    id_stock_register: number
    description: string | null
    quantity: number
    volume: number
    fk_id_child: number
    product: string
}

interface InsertProduct {
    description: string | null
    quantity: number
    volume: number
    fk_id_child: number
    fk_id_product: number
}

interface Products {
    id_product: number
    product_name: string
    fk_id_unit: number
    fk_id_product_type: number
}

interface TypeProduct {
    id_product_type: number
    product_type_name: string
}

export const getProductsIdChild = async (childId: number): Promise<ProducStorage[]> => {
    const response = await api.get<ProducStorage[]>(`/stock/child/${childId}`);
    return response.data;
};

export const insertProduct = async (data: InsertProduct): Promise<InsertProduct> => {
    const response = await api.post<InsertProduct>("/stock", data);
    return response.data;
};

export const deleteProduct = async (productId: number): Promise<any> => {
    const response = await api.delete<any>(`/stock/${productId}`);
    return response.data;
};

export const getProductsIdType = async (typeId: number): Promise<Products[]> => {
    const response = await api.get<Products[]>(`/product/${typeId}`);
    return response.data;
};

export const getTypesProducts = async (): Promise<TypeProduct[]> => {
    const response = await api.get<TypeProduct[]>("type/product");
    return response.data;
};