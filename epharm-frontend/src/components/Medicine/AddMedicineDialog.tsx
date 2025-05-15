
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Medicine } from '@/types';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Medicine name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number.",
  }),
  dosage: z.string().min(1, {
    message: "Dosage is required.",
  }),
  stock: z.string().refine(val => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
    message: "Stock must be a non-negative number.",
  }),
  expiryDate: z.string().min(1, {
    message: "Expiry date is required.",
  }),
  manufacturer: z.string().min(1, {
    message: "Manufacturer is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
});

interface AddMedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (medicine: Medicine) => void;
}

export default function AddMedicineDialog({ open, onOpenChange, onSave }: AddMedicineDialogProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      dosage: "",
      stock: "",
      expiryDate: new Date().toISOString().split('T')[0], // Default to today
      manufacturer: "",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a new Medicine object
    const newMedicine: Medicine = {
      id: Date.now().toString(), // In a real app, this would come from the server
      tenant_id: '1', // Mocked tenant ID
      name: values.name,
      description: values.description,
      price: parseFloat(values.price),
      dosage: values.dosage,
      stock: parseInt(values.stock),
      expiryDate: values.expiryDate,
      created_by: '1', // Mocked user ID
      updated_by: '1', // Mocked user ID
      created_at: new Date().toISOString(),
      manufacturer: values.manufacturer,
      category: values.category,
        pharmacyId: '1', // Vlera e duhur sipas sistemit tënd
    };

    onSave(newMedicine);
    toast({
      title: "Medicine Added",
      description: "New medicine has been successfully added to your inventory",
    });
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
          <DialogDescription>
            Enter the details of the medicine to add it to your inventory.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicine Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Amoxicillin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500mg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the medicine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="e.g., 15.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Stock</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="e.g., 100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., PharmaCorp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Antibiotics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Medicine</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
