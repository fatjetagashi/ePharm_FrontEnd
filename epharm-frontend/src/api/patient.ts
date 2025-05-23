import api from './api';

export const fetchPatients = async () => {
    const res = await api.get('/patients');
    return res.data; // Laravel resources usually wrap data
};

export const fetchPatientById = async (id: string) => {
    const res = await api.get(`/patients/${id}`);
    return res.data.data;
};


export const addPatient = async (data) => {
    const res = await api.post('/patients',data);
    return res.data;
};