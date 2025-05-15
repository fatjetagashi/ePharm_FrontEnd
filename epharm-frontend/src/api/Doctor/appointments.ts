import api from '../../lib/api.ts';

export const getAppointments = async () => {
    const response = await api.get('/appointments');
    return response.data;
};
