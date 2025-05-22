import api from './api';

export const fetchPatients = async () => {
    const res = await api.get('/patients');
    return res.data.data; // Laravel resources usually wrap data
};

export const fetchPatientById = async (id: string) => {
    const res = await api.get(`/patients/${id}`);
    return res.data.data;
};
