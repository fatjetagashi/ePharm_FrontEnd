import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2, Send } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const prescriptionSchema = z.object({
  diagnosis: z.string().min(1, "Diagnosis is required"),
  notes: z.string().optional(),
  medications: z.array(
    z.object({
      name: z.string().min(1, "Medication name is required"),
      dosage: z.string().min(1, "Dosage is required"),
      capsuleCount: z.string().min(1, "Capsule count is required"),
      frequencyPerDay: z.string().min(1, "Frequency is required"),
      intakeTimes: z.string().min(1, "Intake times is required"),
      durationDays: z.string().min(1, "Duration is required"),
    })
  ).min(1, "At least one medication is required"),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  capsuleCount: string;
  frequencyPerDay: string;
  intakeTimes: string;
  durationDays: string;
}

interface Patient {
  id: string;
  name: string;
  licenseNumber: string;
  birthdate: string;
  gender: string;
  address: string;
}

interface InitializePrescriptionProps {
  patient: Patient;
  initialDiagnosis?: string;
  onComplete: (prescriptionData: PrescriptionFormValues) => void;
  onCancel: () => void;
}

const InitializePrescription = ({ 
  patient, 
  initialDiagnosis = "", 
  onComplete, 
  onCancel 
}: InitializePrescriptionProps) => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [medications, setMedications] = useState<MedicationItem[]>([
    {
      id: '1',
      name: '',
      dosage: '',
      capsuleCount: '',
      frequencyPerDay: '',
      intakeTimes: '',
      durationDays: '',
    },
  ]);

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      diagnosis: initialDiagnosis,
      notes: '',
      medications: medications.map(({ id, ...rest }) => rest),
    },
  });

  const addMedication = () => {
    const newMedication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      capsuleCount: '',
      frequencyPerDay: '',
      intakeTimes: '',
      durationDays: '',
    };
    setMedications([...medications, newMedication]);
    
    const currentMedications = form.getValues().medications || [];
    const { id, ...medicationWithoutId } = newMedication;
    form.setValue('medications', [...currentMedications, medicationWithoutId]);
  };

  const removeMedication = (id: string) => {
    if (medications.length <= 1) return;
    const updatedMedications = medications.filter(m => m.id !== id);
    setMedications(updatedMedications);
    
    const index = medications.findIndex(m => m.id === id);
    if (index !== -1) {
      const currentMedications = form.getValues().medications || [];
      form.setValue('medications', [
        ...currentMedications.slice(0, index),
        ...currentMedications.slice(index + 1)
      ]);
    }
  };

  const updateMedication = (id: string, field: keyof Omit<MedicationItem, 'id'>, value: string) => {
    setMedications(
      medications.map(m => (m.id === id ? { ...m, [field]: value } : m))
    );
    
    const index = medications.findIndex(m => m.id === id);
    if (index !== -1) {
      form.setValue(`medications.${index}.${field}`, value);
    }
  };

  const onSubmit = async (data: PrescriptionFormValues) => {
    try {
      setIsSending(true);
      onComplete(data);

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Prescription has been created and sent to patient",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create prescription",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const frequencyOptions = [
    { value: '1', label: 'Once daily' },
    { value: '2', label: 'Twice daily' },
    { value: '3', label: 'Three times daily' },
    { value: '4', label: 'Four times daily' },
  ];

  const intakeOptions = [
    { value: 'before_meals', label: 'Before meals' },
    { value: 'with_meals', label: 'With meals' },
    { value: 'after_meals', label: 'After meals' },
    { value: 'before_sleep', label: 'Before sleep' },
  ];

  const durationOptions = [
    { value: '3', label: '3 days' },
    { value: '5', label: '5 days' },
    { value: '7', label: '7 days' },
    { value: '10', label: '10 days' },
    { value: '14', label: '14 days' },
    { value: '30', label: '30 days' },
  ];

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 pb-24">
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h3 className="font-medium">Patient Information</h3>
            <p className="text-sm">Name: {patient.name}</p>
            <p className="text-sm">License: {patient.licenseNumber}</p>
            <p className="text-sm">DOB: {new Date(patient.birthdate).toLocaleDateString()}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter patient diagnosis"
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Medications</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMedication}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Medication
                  </Button>
                </div>

                <div className="space-y-4">
                  {medications.map((medication, index) => (
                    <Card key={medication.id} className="relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedication(medication.id)}
                        disabled={medications.length <= 1}
                        className="h-8 w-8 p-0 absolute top-2 right-2"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                      
                      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`medications.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Medication Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Medication name"
                                  value={medication.name}
                                  onChange={(e) => {
                                    updateMedication(medication.id, 'name', e.target.value);
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`medications.${index}.dosage`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dosage</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., 500mg"
                                  value={medication.dosage}
                                  onChange={(e) => {
                                    updateMedication(medication.id, 'dosage', e.target.value);
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`medications.${index}.capsuleCount`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Capsule Count</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="e.g., 30"
                                  value={medication.capsuleCount}
                                  onChange={(e) => {
                                    updateMedication(medication.id, 'capsuleCount', e.target.value);
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`medications.${index}.frequencyPerDay`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Frequency Per Day</FormLabel>
                              <Select
                                value={medication.frequencyPerDay}
                                onValueChange={(value) => {
                                  updateMedication(medication.id, 'frequencyPerDay', value);
                                  field.onChange(value);
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {frequencyOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`medications.${index}.intakeTimes`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Intake Times</FormLabel>
                              <Select
                                value={medication.intakeTimes}
                                onValueChange={(value) => {
                                  updateMedication(medication.id, 'intakeTimes', value);
                                  field.onChange(value);
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select intake times" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {intakeOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`medications.${index}.durationDays`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration (Days)</FormLabel>
                              <Select
                                value={medication.durationDays}
                                onValueChange={(value) => {
                                  updateMedication(medication.id, 'durationDays', value);
                                  field.onChange(value);
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {durationOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg">
        <div className="max-w-2xl mx-auto flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="prescription-form"
            disabled={isSending}
            className="flex items-center gap-2 bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
          >
            {isSending ? (
              <>Creating & Sending...</>
            ) : (
              <>
                Finish & Send Prescription
                <Send className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InitializePrescription;