import api from '../../lib/api.ts';

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


export const addDoctor = async (data: AddDoctorPayload) => {
    const response = await api.post('/doctor', data); // or '/doctors' depending on your route
    return response.data;
};
