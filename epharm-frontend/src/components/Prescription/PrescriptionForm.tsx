
import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

const PrescriptionForm = () => {
  const [patientId, setPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<MedicineItem[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
    },
  ]);

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: Date.now().toString(),
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
      },
    ]);
  };

  const removeMedicine = (id: string) => {
    if (medicines.length <= 1) return;
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  const updateMedicine = (id: string, field: keyof MedicineItem, value: string) => {
    setMedicines(
      medicines.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ patientId, diagnosis, medicines });
    // Here you would typically send this data to your backend
  };

  // Mock data
  const patients = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Robert Smith' },
    { id: '3', name: 'Emma Davis' },
    { id: '4', name: 'James Wilson' },
  ];

  const frequencyOptions = [
    { value: 'once-daily', label: 'Once daily' },
    { value: 'twice-daily', label: 'Twice daily' },
    { value: 'three-times-daily', label: 'Three times daily' },
    { value: 'four-times-daily', label: 'Four times daily' },
    { value: 'as-needed', label: 'As needed (PRN)' },
  ];

  const durationOptions = [
    { value: '3-days', label: '3 days' },
    { value: '5-days', label: '5 days' },
    { value: '7-days', label: '7 days' },
    { value: '10-days', label: '10 days' },
    { value: '14-days', label: '14 days' },
    { value: '30-days', label: '30 days' },
    { value: 'ongoing', label: 'Ongoing' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Create New Prescription</CardTitle>
          <CardDescription>
            Fill in the details to create a new prescription for your patient
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="patient">Patient</Label>
              <Select
                value={patientId}
                onValueChange={setPatientId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="diagnosis">Diagnosis</Label>
              <Textarea
                id="diagnosis"
                placeholder="Enter patient diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="min-h-24"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Medications</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMedicine}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Medication
              </Button>
            </div>

            <div className="space-y-6">
              {medicines.map((medicine, index) => (
                <div
                  key={medicine.id}
                  className="p-4 border rounded-lg space-y-4 relative"
                >
                  <div className="absolute top-4 right-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedicine(medicine.id)}
                      disabled={medicines.length <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor={`medicine-name-${index}`}>
                      Medication Name
                    </Label>
                    <Input
                      id={`medicine-name-${index}`}
                      placeholder="Medication name"
                      value={medicine.name}
                      onChange={(e) =>
                        updateMedicine(medicine.id, 'name', e.target.value)
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`medicine-dosage-${index}`}>Dosage</Label>
                      <Input
                        id={`medicine-dosage-${index}`}
                        placeholder="e.g., 500mg"
                        value={medicine.dosage}
                        onChange={(e) =>
                          updateMedicine(medicine.id, 'dosage', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor={`medicine-frequency-${index}`}>
                        Frequency
                      </Label>
                      <Select
                        value={medicine.frequency}
                        onValueChange={(value) =>
                          updateMedicine(medicine.id, 'frequency', value)
                        }
                      >
                        <SelectTrigger id={`medicine-frequency-${index}`}>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`medicine-duration-${index}`}>
                        Duration
                      </Label>
                      <Select
                        value={medicine.duration}
                        onValueChange={(value) =>
                          updateMedicine(medicine.id, 'duration', value)
                        }
                      >
                        <SelectTrigger id={`medicine-duration-${index}`}>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`medicine-instructions-${index}`}>
                        Special Instructions
                      </Label>
                      <Input
                        id={`medicine-instructions-${index}`}
                        placeholder="e.g., Take after meals"
                        value={medicine.instructions}
                        onChange={(e) =>
                          updateMedicine(
                            medicine.id,
                            'instructions',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Issue Prescription</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default PrescriptionForm;
