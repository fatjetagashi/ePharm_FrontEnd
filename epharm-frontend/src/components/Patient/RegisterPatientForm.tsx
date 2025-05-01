
import React from 'react';
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const patientSchema = z.object({
  licenseNumber: z.string().min(5, "License number must be at least 5 characters"),
  birthdate: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  condition: z.string().min(1, "Medical condition is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface RegisterPatientFormProps {
  onSuccess: (data: PatientFormValues) => void;
  onCancel: () => void;
}

const RegisterPatientForm = ({ onSuccess, onCancel }: RegisterPatientFormProps) => {
  const { toast } = useToast();
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      licenseNumber: "",
      birthdate: "",
      gender: "",
      address: "",
      condition: "",
      diagnosis: "",
    },
  });

  const onSubmit = (data: PatientFormValues) => {
    try {
      onSuccess(data);
      toast({
        title: "Success",
        description: "Patient registered and prescription initiated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register patient",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
              <FormControl>
                <Input placeholder="Patient license number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input placeholder="Male/Female/Other" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical Condition</FormLabel>
              <FormControl>
                <Input placeholder="Diabetes, Hypertension, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diagnosis</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter patient diagnosis details" 
                  className="min-h-24"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Proceed to Prescription</Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterPatientForm;
