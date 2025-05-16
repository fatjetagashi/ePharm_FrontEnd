
import axios from 'axios';

export interface Medicine {
    id?: number;
    name: string;
    description?: string;
    price: number;
    stock_quantity: number;
    expire_date: string;
}

export const getMedicines = async (): Promise<Medicine[]> => {
    const response = await axios.get('/api/medicines');
    return response.data.data;
};

export const createMedicine = async (data: Medicine): Promise<Medicine> => {
    const response = await axios.post('/api/medicines', data);
    return response.data;
};

export const updateMedicine = async (id: number, data: Medicine): Promise<Medicine> => {
    const response = await axios.put(`/api/medicines/${id}`, data);
    return response.data;
};

export const deleteMedicine = async (id: number): Promise<void> => {
    await axios.delete(`/api/medicines/${id}`);
};
