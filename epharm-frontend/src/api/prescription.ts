import api from './api';

export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
}

export interface Prescription {
    id: string;
    patient: string;
    doctor: string;
    date: string;
    status: string;
    medications: Medication[];
    diagnosis: string;
    notes: string;
}

// Get all prescriptions
export const fetchPrescriptions = async (): Promise<Prescription[]> => {
    const response = await api.get('/prescriptions');
    return response.data.data;
};

// Get prescriptions by patient ID
export const fetchPrescriptionsByPatient = async (patientId: string): Promise<Prescription[]> => {
    const response = await api.get(`/patients/${patientId}/prescriptions`);
    return response.data.data;
};
