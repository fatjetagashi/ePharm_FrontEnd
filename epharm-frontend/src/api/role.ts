import api from './api';

export const fetchRoles = async () => {
    const res = await api.get('/roles');
    return res.data;
};

export const storeRole = async (data) => {
    const res = await api.post('/roles',data);
    return res.data; // Laravel resources usually wrap data
};

export const updateRole = async (id,role) => {
    const res = await api.put(`/roles/${id}`,role);
    return res.data; // Laravel resources usually wrap data
};