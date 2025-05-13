
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient' | 'pharmacy';
  avatar?: string;
  tenant_id?: string;
  user_type?: string;
  is_verified?: boolean;
  phone?: string;
}

export interface Patient {
  id: string;
  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender?: string;
  user_id?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  is_verified?: boolean;
  user_id?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  licenseNumber: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  tenant_id?: string;
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
  tenant_id?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  status: 'pending' | 'sent' | 'filled';
  createdAt: string;
  tenant_id?: string;
  notes?: string;
  discount_code_id?: string;
}

export interface PrescriptionMedicine {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  capsule_count?: number;
  intake_times?: string[];
  duration_days?: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'prescription' | 'medication' | 'system' | 'reminder';
  read: boolean;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  type: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DeliveryType {
  id: string;
  name: string;
}

export interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role_id: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  percent: number;
  usage_limit: number;
  expires_at: string;
}

export interface PharmacySale {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  total_amount: number;
  credit_awarded: number;
  sale_date: string;
  processed_by: string;
}

export interface PharmacySaleItem {
  id: string;
  sale_id: string;
  medicine_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface PharmacyCredit {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  credit_points: number;
  earned_at: string;
}

export interface Bill {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  sale_id: string;
  payment_method: string;
  total_price: number;
  created_at: string;
}

export interface MedicationReminder {
  id: string;
  patient_id: string;
  prescription_item_id: string;
  reminder_date: string;
  sent: boolean;
  created_at: string;
}

export interface MedicineLog {
  id: string;
  medicine_id: string;
  action: 'create' | 'update' | 'delete';
  changed_by: string;
  details: string;
  created_at: string;
}

export interface PharmacyReview {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  rating: number;
  comment: string;
  created_at: string;
}
