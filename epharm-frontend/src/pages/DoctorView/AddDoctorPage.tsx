
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, { message: "Doctor name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    specialization: z.string().min(1, { message: "Specialization is required" }),
    licenseNumber: z.string().min(1, { message: "License number is required" }),
    phone: z.string().min(5, { message: "Phone number is required" }),
    address: z.string().min(5, { message: "Address is required" }),
    bio: z.string().optional(),
    status: z.enum(["active", "inactive", "verification"]),
});

type FormValues = z.infer<typeof formSchema>;

const AddDoctorPage = () => {
    const navigate = useNavigate();

    // Default form values
    const defaultValues: Partial<FormValues> = {
        status: "verification",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = (data: FormValues) => {
        // In a real app, this would send the data to an API
        console.log('Form submitted:', data);

        // Show success message
        toast.success("Doctor added successfully!");

        // Navigate back to the doctors list
        navigate('/doctors');
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Add Doctor</h1>
                        <p className="text-muted-foreground">Create a new doctor profile</p>
                    </div>

                    <Button variant="outline" onClick={() => navigate('/doctors')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to List
                    </Button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dr. John Smith" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="doctor@example.com" type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="specialization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specialization</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select specialization" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="cardiologist">Cardiologist</SelectItem>
                                                <SelectItem value="neurologist">Neurologist</SelectItem>
                                                <SelectItem value="pediatrician">Pediatrician</SelectItem>
                                                <SelectItem value="dermatologist">Dermatologist</SelectItem>
                                                <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                                                <SelectItem value="orthopedic">Orthopedic Surgeon</SelectItem>
                                                <SelectItem value="gynecologist">Gynecologist</SelectItem>
                                                <SelectItem value="ophthalmologist">Ophthalmologist</SelectItem>
                                                <SelectItem value="general">General Physician</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="licenseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>License Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="MED123456" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 (555) 123-4567" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                                <SelectItem value="verification">Pending Verification</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="123 Medical Center Dr, City, State, ZIP" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Professional Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief professional background and qualifications..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Optional: Provide a short professional bio for the doctor
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={() => navigate('/doctors')}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save Doctor
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </DashboardLayout>
    );
};

export default AddDoctorPage;
