import axios from 'axios';

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

export const fetchPrescriptions = async (): Promise<Prescription[]> => {
    const response = await axios.get('/api/prescriptions');
    return response.data.data; // Assuming Laravel uses resources
};
