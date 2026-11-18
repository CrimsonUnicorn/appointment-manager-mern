import { apiRequest } from '../api';

export const getAppointments = ({ status = 'All', search = '' } = {}) => {
    const params = new URLSearchParams();
    if (status && status !== 'All') params.append('status', status);
    if (search && search.trim()) params.append('search', search.trim());

    const query = params.toString();
    return apiRequest(`/appointments${query ? `?${query}` : ''}`);
};

export const createAppointment = (payload) => {
    return apiRequest('/appointments', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const updateAppointmentStatus = (id, status) => {
    return apiRequest(`/appointments/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
};