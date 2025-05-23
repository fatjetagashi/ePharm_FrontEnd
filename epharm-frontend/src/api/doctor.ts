import api from '../lib/api';

export interface AddDoctorPayload {
    name: string;
    email: string;
    specialization: string;
    licenseNumber: string;
    phone: string;
    address: string;
    bio?: string;
    status: 'active' | 'inactive' | 'verification';
}


export const getAllDoctors = async () => {
    const response = await api.get('/doctors'); // or '/doctors' depending on your route
    return response.data;
};

export const verifyDoctorViaAPI = async (id) => {
    const response = await api.get(`/verify-doctor/${id}`); // or '/doctors' depending on your route
    return response.data;
};

export const addDoctor = async (data: AddDoctorPayload) => {
    const response = await api.post('/doctor', data); // or '/doctors' depending on your route
    return response.data;
};