import api from './api';

export const fetchPharmacyUsers = async () => {
    const res = await api.get('/pharmacy-users');
    return res.data; // Laravel resources usually wrap data
};


export const verifyPharmacyViaAPI = async (id) => {
    const res = await api.get(`/verify-pharmacy/${id}`);
    return res.data; // Laravel resources usually wrap data
};
