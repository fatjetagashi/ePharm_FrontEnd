import api from './api';

export const fetchPermissions = async () => {
    const res = await api.get('/permissions');
    return res.data;
};

export const storePermission = async (data) => {
    const res = await api.post('/permissions',data);
    return res.data; // Laravel resources usually wrap data
};

export const updatePermission = async (id,permission) => {
    const res = await api.put(`/permissions/${id}`,permission);
    return res.data; // Laravel resources usually wrap data
};