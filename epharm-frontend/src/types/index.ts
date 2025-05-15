// src/types/index.ts

/**
 * Core user profile used in authentication and general user context.
 */
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
  status: 'active' | 'completed' | 'skipped' | 'paused';
}
/**
 * Basic patient structure used across modules.
 */

export interface Patient {
  id: string;
  user_id: string;
  license_number: string;
  birthdate: string;
  gender: string;
  address: string;
  created_at: string;
  user: User;
}

/**
 * User context within a sale or bill: no `role` required, just identification fields.
 */
export interface SaleUser {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  user_type: string;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Patient context within a sale or bill, including nested user data.
 */
export interface SalePatient {
  id: string;
  user_id: string;
  license_number: string;
  birthdate: string;
  gender: string;
  address: string;
  created_at: string;
  user: SaleUser;
}

/**
 * Medicine record as returned in sales contexts, including metadata fields.
 */
export interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  expiryDate: string;
  dosage: string;
  pharmacyId: string;
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  manufacturer?: string;
  category?: string;
  tenant_id?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  licenseNumber: string;
  email: string;
  phone: string;
  logo?: string;
  tenant_id?: string;
}

/**
 * A single sale item without full medicine detail.
 */
export interface PharmacySaleItem {
  id: string;
  sale_id: string;
  medicine_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

/**
 * Sale item with full medicine object attached.
 */
export interface PharmacySaleItemFull extends PharmacySaleItem {
  medicine: Medicine;
}

/**
 * A complete pharmacy sale record, including patient and item details.
 */
export interface PharmacySale {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  total_amount: number;
  credit_awarded: number;
  sale_date: string;
  processed_by: string;
  patient: SalePatient;
  items: PharmacySaleItemFull[];
}

/**
 * A billing record linking to a sale and patient.
 */
export interface Bill {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  sale_id: string;
  payment_method: string;
  total_price: number;
  created_at: string;
  patient: SalePatient;
  sale: PharmacySale;
}


export interface Notification {
  id: string;
  user_id: string;  // matches your mock
  type:string;
  title: string;
  message: string;
  is_read: boolean;    // matches your mock
  created_at: string;  // matches your mock
}


export interface Supplier {
  id: string;
  tenant_id: string;
  name: string;
  contact_email: string;
  phone: string;
  address: string;
  created_at: string;
}

/**
 * A single item within a supplier order.
 */
export interface SupplierOrderItem {
  id: string;
  supplier_order_id: string;
  medication_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

/**
 * An order placed to a supplier, including items and supplier info.
 */
export interface SupplierOrder {
  id: string;
  tenant_id: string;
  supplier_id: string;
  order_date: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total_cost: number;
  created_by: string;
  created_at: string;
  supplier: Supplier;
  items: SupplierOrderItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  user_type: string;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}


export interface PharmacyCredit {
  id: string;
  pharmacy_id: string;
  patient_id: string;
  credit_points: number;
  earned_at: string;
}


// --- Prescription types ---

/**
 * Doctor reference nested on a Prescription
 */
export interface PrescriptionDoctor {
  id: string;
  user: SaleUser;
}

/**
 * Patient reference nested on a Prescription
 */
export interface PrescriptionPatient {
  id: string;
  user: SaleUser;
}

/**
 * A single item inside a prescription.
 */
export interface PrescriptionItem {
  id: string;
  prescription_id: string;
  medication_name: string;
  dosage: string;
  capsule_count: number;
  frequency_per_day: number;
  intake_times: string;
  duration_days: number;
}

/**
 * Delivery details for a prescription.
 */
export interface PrescriptionDelivery {
  id: string;
  prescription_id: string;
  pharmacy_id: string;
  delivery_type: 'take-out' | 'online_fast' | 'online_general';
  status: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  discount_applied: number;
  delivered_at?: string;
}

/**
 * A full prescription record, including nested doctor, patient, items, and delivery.
 */
export interface Prescription {
  id: string;
  tenant_id: string;
  doctor_id: string;
  patient_id: string;
  diagnosis: string;
  notes: string;
  is_sent_to_patient: boolean;
  created_at: string;
  doctor: PrescriptionDoctor;
  patient: PrescriptionPatient;
  items: PrescriptionItem[];
  delivery: PrescriptionDelivery;
}