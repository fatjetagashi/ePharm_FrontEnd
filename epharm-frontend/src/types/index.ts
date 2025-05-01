
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient' | 'pharmacy';
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  expiryDate: string;
  dosage: string;
  pharmacyId: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  status: 'pending' | 'sent' | 'filled';
  createdAt: string;
}

export interface PrescriptionMedicine {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'prescription' | 'medication' | 'system';
  read: boolean;
  createdAt: string;
}

// Add a new type for the medication items used in the UI components
export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  intakeTimes: string[];
  duration: string;
  remainingDoses: number;
  reminderEnabled: boolean;
  prescriptionId: string;
  status: string;
}
