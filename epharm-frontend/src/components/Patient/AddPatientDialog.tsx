
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PatientSearch from './PatientSearch';
import RegisterPatientForm from './RegisterPatientForm';
import InitializePrescription from './InitializePrescription';
import { z } from 'zod';

// Types
interface Patient {
  id: string;
  name: string;
  licenseNumber: string;
  birthdate: string;
  gender: string;
  address: string;
}

interface AddPatientDialogProps {
  onPatientSelect: (patient: any) => void;
}

type DialogState = 'search' | 'register' | 'prescription';

const AddPatientDialog = ({ onPatientSelect }: AddPatientDialogProps) => {
  const [dialogState, setDialogState] = useState<DialogState>('search');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [initialDiagnosis, setInitialDiagnosis] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const resetState = () => {
    setDialogState('search');
    setSelectedPatient(null);
    setInitialDiagnosis('');
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setDialogState('prescription');
  };

  const handleRegistrationSuccess = (data: any) => {
    // Create a new patient from the registration data
    const newPatient: Patient = {
      id: Date.now().toString(),
      name: data.licenseNumber, // In a real app, you would have the patient's name
      licenseNumber: data.licenseNumber,
      birthdate: data.birthdate,
      gender: data.gender,
      address: data.address,
    };
    
    setSelectedPatient(newPatient);
    setInitialDiagnosis(data.diagnosis);
    setDialogState('prescription');
  };

  const handlePrescriptionComplete = (prescriptionData: any) => {
    if (!selectedPatient) return;
    
    // Combine patient and prescription data
    const completeData = {
      patient: selectedPatient,
      prescription: {
        diagnosis: prescriptionData.diagnosis,
        notes: prescriptionData.notes,
        medications: prescriptionData.medications,
      }
    };
    
    // Pass the complete data to the parent component
    onPatientSelect(completeData);
    
    // Close the dialog and reset state
    toast({
      title: "Success",
      description: "Patient added with prescription",
    });
    setIsOpen(false);
    resetState();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetState();
    }}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {dialogState === 'search' && "Add Patient to Your List"}
            {dialogState === 'register' && "Register New Patient"}
            {dialogState === 'prescription' && "Create Prescription"}
          </DialogTitle>
        </DialogHeader>
        
        {dialogState === 'search' && (
          <PatientSearch
            onPatientSelect={handlePatientSelect}
            onRegisterNew={() => setDialogState('register')}
          />
        )}
        
        {dialogState === 'register' && (
          <RegisterPatientForm
            onSuccess={handleRegistrationSuccess}
            onCancel={() => setDialogState('search')}
          />
        )}
        
        {dialogState === 'prescription' && selectedPatient && (
          <InitializePrescription
            patient={selectedPatient}
            initialDiagnosis={initialDiagnosis}
            onComplete={handlePrescriptionComplete}
            onCancel={() => setDialogState('search')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;