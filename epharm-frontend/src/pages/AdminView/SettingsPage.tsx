
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/AdminComponents/DashboardLayout';
import { User, Bell, Shield, Building, FileText, UserCog, ClipboardList, Globe, Check, X, Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { fetchRoles, storeRole, updateRole } from '@/api/role';
import { fetchPermissions, storePermission, updatePermission } from '@/api/permission';

// Define interfaces for our data models
interface Pharmacy {
    id: string;
    name: string;
    type: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
}

interface Role {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Permission {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface DeliveryType {
    id: string;
    name: string;
}

interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    action: string;
    entity: string;
    description: string;
}

const SettingsPage = () => {
    const [openPermissionsDialog, setOpenPermissionsDialog] = useState(false);
    const [editPharmacyDialog, setEditPharmacyDialog] = useState(false);
    const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([
        {
            id: '1',
            name: 'MediPharm Central',
            type: 'pharmacy',
            is_verified: true,
            created_at: '2025-01-15',
            updated_at: '2025-04-20'
        },
        {
            id: '2',
            name: 'Dr. Johnson Clinic',
            type: 'doctor',
            is_verified: true,
            created_at: '2025-02-10',
            updated_at: '2025-04-15'
        },
        {
            id: '3',
            name: 'MediSupply Co.',
            type: 'supplier',
            is_verified: false,
            created_at: '2025-03-22',
            updated_at: '2025-03-22'
        },
        {
            id: '4',
            name: 'City Health Center',
            type: 'pharmacy',
            is_verified: true,
            created_at: '2025-01-30',
            updated_at: '2025-04-01'
        }
    ]);

    // State for roles and permissions
    const [roles, setRoles] = useState<Role[]>([
        { id: '1', name: 'Admin', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '2', name: 'Doctor', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '3', name: 'Patient', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '4', name: 'Pharmacy', created_at: '2025-01-01', updated_at: '2025-01-01' },
    ]);

    const [permissions, setPermissions] = useState<Permission[]>([
        { id: '1', name: 'view_patients', description: 'View patient information', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '2', name: 'create_prescription', description: 'Create and manage prescriptions', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '3', name: 'view_medicines', description: 'View medicine catalog', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '4', name: 'manage_inventory', description: 'Manage pharmacy inventory', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '5', name: 'process_orders', description: 'Process customer orders', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '6', name: 'view_prescriptions', description: 'View prescriptions', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '7', name: 'view_pharmacies', description: 'View pharmacy information', created_at: '2025-01-01', updated_at: '2025-01-01' },
        { id: '8', name: 'all', description: 'Full system access', created_at: '2025-01-01', updated_at: '2025-01-01' },
    ]);

    // State for delivery types
    const [deliveryTypes, setDeliveryTypes] = useState<DeliveryType[]>([
        { id: '1', name: 'online_fast' },
        { id: '2', name: 'take-out' },
        { id: '3', name: 'standard_delivery' },
        { id: '4', name: 'express_delivery' },
    ]);

    // State for audit logs
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
        { id: '1', timestamp: '2025-04-26 14:32:15', user: 'admin@epharm.com', action: 'CREATE', entity: 'Pharmacy', description: 'Created new pharmacy \'MediPharm Central\'' },
        { id: '2', timestamp: '2025-04-25 09:15:42', user: 'admin@epharm.com', action: 'UPDATE', entity: 'User', description: 'Updated user role for \'john.smith@clinic.com\'' },
        { id: '3', timestamp: '2025-04-24 16:08:30', user: 'admin@epharm.com', action: 'DELETE', entity: 'DeliveryType', description: 'Removed delivery type \'pickup_in_store\'' },
        { id: '4', timestamp: '2025-04-24 11:22:51', user: 'admin@epharm.com', action: 'VERIFY', entity: 'Pharmacy', description: 'Verified pharmacy \'City Health Center\'' },
    ]);

    // State for filters in audit log
    const [actionFilter, setActionFilter] = useState('all');
    const [userFilter, setUserFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // State for general settings
    const [generalSettings, setGeneralSettings] = useState({
        platformName: 'ePharm Healthcare',
        supportEmail: 'support@epharm.com',
        defaultLanguage: 'en',
        dateFormat: 'mdy',
        twoFactorAuth: false,
        passwordPolicy: true,
        sessionTimeout: true,
        sessionLength: '30',
        emailNotifications: true,
        systemAlerts: true
    });

    // State for new role dialog
    const [newRoleDialog, setNewRoleDialog] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    // State for new permission dialog
    const [newPermissionDialog, setNewPermissionDialog] = useState(false);
    const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

    // State for delivery type dialog
    const [deliveryTypeDialog, setDeliveryTypeDialog] = useState(false);
    const [editingDeliveryType, setEditingDeliveryType] = useState<DeliveryType | null>(null);

    // Role permissions mapping
    const rolePermissions = {
        '1': ['8'], // Admin has all permissions
        '2': ['1', '2', '3', '6'], // Doctor permissions
        '3': ['6', '7'], // Patient permissions
        '4': ['3', '4', '5'], // Pharmacy permissions
    };

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await fetchRoles();
                console.log(data)
                setRoles(data);
            } catch (err) {
                console.error('Failed to fetch patients', err);
            }
        };

        const loadPermissions = async () => {
            try {
                const data = await fetchPermissions();
                console.log(data)
                setPermissions(data);
            } catch (err) {
                console.error('Failed to fetch patients', err);
            }
        };
        loadRoles();
        loadPermissions()
    }, []);


    // Edit pharmacy handler
    const handleEditPharmacy = (pharmacy: Pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setEditPharmacyDialog(true);
    };

    // Verify pharmacy handler
    const handleVerifyPharmacy = (pharmacy: Pharmacy, verified: boolean) => {
        const updatedPharmacies = pharmacies.map(t => {
            if (t.id === pharmacy.id) {
                return { ...t, is_verified: verified, updated_at: new Date().toISOString().split('T')[0] };
            }
            return t;
        });
        setPharmacies(updatedPharmacies);
        toast(verified ? "Pharmacy verified successfully" : "Pharmacy unverified successfully");

        // Add to audit log
        const newLog = {
            id: `${auditLogs.length + 1}`,
            timestamp: new Date().toLocaleString(),
            user: 'admin@epharm.com',
            action: verified ? 'VERIFY' : 'UNVERIFY',
            entity: 'Pharmacy',
            description: `${verified ? 'Verified' : 'Unverified'} pharmacy '${pharmacy.name}'`
        };
        setAuditLogs([newLog, ...auditLogs]);
    };

    // Save pharmacy handler
    const handleSavePharmacy = (data: any) => {
        if (selectedPharmacy) {
            const updatedPharmacies = pharmacies.map(t => {
                if (t.id === selectedPharmacy.id) {
                    return {
                        ...t,
                        name: data.name,
                        type: data.type,
                        updated_at: new Date().toISOString().split('T')[0]
                    };
                }
                return t;
            });
            setPharmacies(updatedPharmacies);
            toast("Pharmacy updated successfully");

            // Add to audit log
            const newLog = {
                id: `${auditLogs.length + 1}`,
                timestamp: new Date().toLocaleString(),
                user: 'admin@epharm.com',
                action: 'UPDATE',
                entity: 'Pharmacy',
                description: `Updated pharmacy '${data.name}'`
            };
            setAuditLogs([newLog, ...auditLogs]);
        } else {
            // Create new pharmacy
            const newPharmacy: Pharmacy = {
                id: `${pharmacies.length + 1}`,
                name: data.name,
                type: data.type,
                is_verified: false,
                created_at: new Date().toISOString().split('T')[0],
                updated_at: new Date().toISOString().split('T')[0]
            };
            setPharmacies([...pharmacies, newPharmacy]);
            toast("New pharmacy added successfully");

            // Add to audit log
            const newLog = {
                id: `${auditLogs.length + 1}`,
                timestamp: new Date().toLocaleString(),
                user: 'admin@epharm.com',
                action: 'CREATE',
                entity: 'Pharmacy',
                description: `Created new pharmacy '${data.name}'`
            };
            setAuditLogs([newLog, ...auditLogs]);
        }
        setEditPharmacyDialog(false);
        setSelectedPharmacy(null);
    };

    // Handler for adding/editing roles
    const handleSaveRole = async (data: { name: string }) => {
        if (editingRole) {
            const updatedRoles = roles.map(role => {
                if (role.id === editingRole.id) {
                    return {
                        ...role,
                        name: data.name,
                        updated_at: new Date().toISOString().split('T')[0]
                    };
                }
                return role;
            });

            const updateRoleResponse = await updateRole(editingRole.id,{
                name: data.name,
                id: editingRole.id,
            });

            setRoles(updatedRoles);
            toast("Role updated successfully");
        } else {
            // Create new role
            const newRole: Role = {
                id: `${roles.length + 1}`,
                name: data.name,
                created_at: new Date().toISOString().split('T')[0],
                updated_at: new Date().toISOString().split('T')[0]
            };
            const storeRoleResponse = await storeRole(newRole);
            setRoles([...roles, newRole]);
            toast("New role added successfully");
        }
        setNewRoleDialog(false);
        setEditingRole(null);
    };

    // Handler for adding/editing permissions
    const handleSavePermission = async (data: { name: string, description: string }) => {
        if (editingPermission) {
            const updatedPermissions = permissions.map(permission => {
                if (permission.id === editingPermission.id) {
                    return {
                        ...permission,
                        name: data.name,
                        description: data.description,
                        updated_at: new Date().toISOString().split('T')[0]
                    };
                }
                return permission;
            });
            const updatePermissionResponse = await updatePermission(editingPermission.id,
                {
                    name: data.name,
                    description: data.description,
                });
            setPermissions(updatedPermissions);
            toast("Permission updated successfully");
        } else {
            // Create new permission
            const newPermission: Permission = {
                id: `${permissions.length + 1}`,
                name: data.name,
                description: data.description,
                created_at: new Date().toISOString().split('T')[0],
                updated_at: new Date().toISOString().split('T')[0]
            };
            const storePermissionResponse = await storePermission(newPermission);
            setPermissions([...permissions, newPermission]);
            toast("New permission added successfully");
        }

        setNewPermissionDialog(false);
        setEditingPermission(null);
    };

    // Handler for adding/editing delivery types
    const handleSaveDeliveryType = (data: { name: string }) => {
        if (editingDeliveryType) {
            const updatedDeliveryTypes = deliveryTypes.map(type => {
                if (type.id === editingDeliveryType.id) {
                    return {
                        ...type,
                        name: data.name
                    };
                }
                return type;
            });
            setDeliveryTypes(updatedDeliveryTypes);
            toast("Delivery type updated successfully");

            // Add to audit log
            const newLog = {
                id: `${auditLogs.length + 1}`,
                timestamp: new Date().toLocaleString(),
                user: 'admin@epharm.com',
                action: 'UPDATE',
                entity: 'DeliveryType',
                description: `Updated delivery type to '${data.name}'`
            };
            setAuditLogs([newLog, ...auditLogs]);
        } else {
            // Create new delivery type
            const newDeliveryType: DeliveryType = {
                id: `${deliveryTypes.length + 1}`,
                name: data.name
            };
            setDeliveryTypes([...deliveryTypes, newDeliveryType]);
            toast("New delivery type added successfully");

            // Add to audit log
            const newLog = {
                id: `${auditLogs.length + 1}`,
                timestamp: new Date().toLocaleString(),
                user: 'admin@epharm.com',
                action: 'CREATE',
                entity: 'DeliveryType',
                description: `Added new delivery type '${data.name}'`
            };
            setAuditLogs([newLog, ...auditLogs]);
        }
        setDeliveryTypeDialog(false);
        setEditingDeliveryType(null);
    };

    // Handle deletion of a delivery type
    const handleDeleteDeliveryType = (id: string) => {
        const typeToDelete = deliveryTypes.find(type => type.id === id);
        if (typeToDelete) {
            setDeliveryTypes(deliveryTypes.filter(type => type.id !== id));
            toast("Delivery type deleted successfully");

            // Add to audit log
            const newLog = {
                id: `${auditLogs.length + 1}`,
                timestamp: new Date().toLocaleString(),
                user: 'admin@epharm.com',
                action: 'DELETE',
                entity: 'DeliveryType',
                description: `Removed delivery type '${typeToDelete.name}'`
            };
            setAuditLogs([newLog, ...auditLogs]);
        }
    };

    // Handle saving general settings
    const handleSaveGeneralSettings = () => {
        toast("Settings saved successfully");

        // Add to audit log
        const newLog = {
            id: `${auditLogs.length + 1}`,
            timestamp: new Date().toLocaleString(),
            user: 'admin@epharm.com',
            action: 'UPDATE',
            entity: 'Settings',
            description: 'Updated general system settings'
        };
        setAuditLogs([newLog, ...auditLogs]);
    };

    // Filter audit logs based on action, user, and search query
    const filteredAuditLogs = auditLogs.filter(log => {
        const matchesAction = actionFilter === 'all' || log.action.toLowerCase() === actionFilter.toLowerCase();
        const matchesUser = userFilter === 'all' || log.user.includes(userFilter);
        const matchesSearch = searchQuery === '' ||
            log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.entity.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesAction && matchesUser && matchesSearch;
    });

    // Component for the Pharmacy form
    const PharmacyForm = ({ pharmacy, onSave }: { pharmacy: Pharmacy | null, onSave: (data: any) => void }) => {
        const form = useForm({
            defaultValues: {
                name: pharmacy?.name || '',
                type: pharmacy?.type || 'pharmacy'
            }
        });

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pharmacy Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter pharmacy name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pharmacy Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select pharmacy type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                                        <SelectItem value="doctor">Doctor Clinic</SelectItem>
                                        <SelectItem value="supplier">Supplier</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
            </Form>
        );
    };

    // Role Form Component
    const RoleForm = ({ role, onSave }: { role: Role | null, onSave: (data: any) => void }) => {
        const form = useForm({
            defaultValues: {
                name: role?.name || '',
            }
        });

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter role name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <Button type="submit">Save Role</Button>
                    </DialogFooter>
                </form>
            </Form>
        );
    };

    // Permission Form Component
    const PermissionForm = ({ permission, onSave }: { permission: Permission | null, onSave: (data: any) => void }) => {
        const form = useForm({
            defaultValues: {
                name: permission?.name || '',
                description: permission?.description || '',
            }
        });

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Permission Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter permission name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter permission description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <Button type="submit">Save Permission</Button>
                    </DialogFooter>
                </form>
            </Form>
        );
    };

    // Delivery Type Form Component
    const DeliveryTypeForm = ({ deliveryType, onSave }: { deliveryType: DeliveryType | null, onSave: (data: any) => void }) => {
        const form = useForm({
            defaultValues: {
                name: deliveryType?.name || '',
            }
        });

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Delivery Type Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter delivery type (e.g., express_delivery)" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <Button type="submit">Save Delivery Type</Button>
                    </DialogFooter>
                </form>
            </Form>
        );
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage platform settings and configurations</p>
                </div>

                <Tabs defaultValue="pharmacies" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="pharmacies" className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>Pharmacies</span>
                        </TabsTrigger>
                        <TabsTrigger value="roles" className="flex items-center gap-2">
                            <UserCog className="h-4 w-4" />
                            <span>Roles & Permissions</span>
                        </TabsTrigger>
                        <TabsTrigger value="delivery" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>Delivery Types</span>
                        </TabsTrigger>
                        <TabsTrigger value="audit" className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            <span>Audit Log</span>
                        </TabsTrigger>
                        <TabsTrigger value="general" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>General</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Pharmacies Tab */}
                    <TabsContent value="pharmacies" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Pharmacies Management</CardTitle>
                                    <CardDescription>
                                        Manage pharmacies, doctor clinics, and suppliers
                                    </CardDescription>
                                </div>
                                <Dialog open={editPharmacyDialog} onOpenChange={setEditPharmacyDialog}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedPharmacy(null)}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Pharmacy
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {selectedPharmacy ? 'Edit Pharmacy' : 'Add New Pharmacy'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {selectedPharmacy
                                                    ? 'Update the pharmacy information below.'
                                                    : 'Add a new pharmacy to the platform.'}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <PharmacyForm
                                            pharmacy={selectedPharmacy}
                                            onSave={handleSavePharmacy}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead>Last Updated</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pharmacies.map((pharmacy) => (
                                                <TableRow key={pharmacy.id}>
                                                    <TableCell className="font-medium">{pharmacy.name}</TableCell>
                                                    <TableCell className="capitalize">{pharmacy.type}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={pharmacy.is_verified ? "default" : "outline"}
                                                            className={pharmacy.is_verified ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}
                                                        >
                                                            {pharmacy.is_verified ? 'Verified' : 'Unverified'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{pharmacy.created_at}</TableCell>
                                                    <TableCell>{pharmacy.updated_at}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            {pharmacy.is_verified ? (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleVerifyPharmacy(pharmacy, false)}
                                                                >
                                                                    <X className="mr-1 h-4 w-4 text-red-500" />
                                                                    Unverify
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleVerifyPharmacy(pharmacy, true)}
                                                                >
                                                                    <Check className="mr-1 h-4 w-4 text-green-500" />
                                                                    Verify
                                                                </Button>
                                                            )}
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleEditPharmacy(pharmacy)}
                                                            >
                                                                <Edit className="mr-1 h-4 w-4" />
                                                                Edit
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Roles & Permissions Tab */}
                    <TabsContent value="roles" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Roles Management</CardTitle>
                                <CardDescription>
                                    Manage user roles and their permissions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Role Name</TableHead>
                                                <TableHead>Permissions</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {roles.map((role) => (
                                                <TableRow key={role.id}>
                                                    <TableCell className="font-medium">{role.name}</TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {rolePermissions[role.id as keyof typeof rolePermissions]?.slice(0, 2).map((permId) => {
                                                                const perm = permissions.find(p => p.id === permId);
                                                                return (
                                                                    <Badge key={permId} variant="outline" className="bg-blue-50">
                                                                        {perm?.name || permId}
                                                                    </Badge>
                                                                );
                                                            })}
                                                            {rolePermissions[role.id as keyof typeof rolePermissions]?.length > 2 && (
                                                                <Badge variant="outline">
                                                                    +{rolePermissions[role.id as keyof typeof rolePermissions].length - 2} more
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingRole(role);
                                                                setNewRoleDialog(true);
                                                            }}
                                                        >
                                                            Edit Role
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={() => {
                                        setEditingRole(null);
                                        setNewRoleDialog(true);
                                    }}>
                                        Add New Role
                                    </Button>
                                </div>

                                {/* New Role Dialog */}
                                <Dialog open={newRoleDialog} onOpenChange={setNewRoleDialog}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {editingRole ? 'Edit Role' : 'Add New Role'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {editingRole
                                                    ? 'Update the role information below.'
                                                    : 'Add a new role to the platform.'}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <RoleForm
                                            role={editingRole}
                                            onSave={handleSaveRole}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Permissions List</CardTitle>
                                <CardDescription>
                                    All available permissions in the system
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Permission Name</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {permissions.map((permission) => (
                                                <TableRow key={permission.id}>
                                                    <TableCell className="font-medium">{permission.name}</TableCell>
                                                    <TableCell>{permission.description}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingPermission(permission);
                                                                setNewPermissionDialog(true);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={() => {
                                        setEditingPermission(null);
                                        setNewPermissionDialog(true);
                                    }}>
                                        Add New Permission
                                    </Button>
                                </div>

                                {/* New Permission Dialog */}
                                <Dialog open={newPermissionDialog} onOpenChange={setNewPermissionDialog}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {editingPermission ? 'Edit Permission' : 'Add New Permission'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {editingPermission
                                                    ? 'Update the permission information below.'
                                                    : 'Add a new permission to the platform.'}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <PermissionForm
                                            permission={editingPermission}
                                            onSave={handleSavePermission}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Delivery Types Tab */}
                    <TabsContent value="delivery" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Delivery Types</CardTitle>
                                <CardDescription>
                                    Manage delivery methods available in the system
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {deliveryTypes.map((type) => (
                                                <TableRow key={type.id}>
                                                    <TableCell className="font-medium">{type.name}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setEditingDeliveryType(type);
                                                                    setDeliveryTypeDialog(true);
                                                                }}
                                                            >
                                                                <Edit className="mr-1 h-4 w-4" />
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-red-500 hover:text-red-600"
                                                                onClick={() => handleDeleteDeliveryType(type.id)}
                                                            >
                                                                <Trash2 className="mr-1 h-4 w-4" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex justify-end">
                                    <Button onClick={() => {
                                        setEditingDeliveryType(null);
                                        setDeliveryTypeDialog(true);
                                    }}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Delivery Type
                                    </Button>
                                </div>

                                {/* Delivery Type Dialog */}
                                <Dialog open={deliveryTypeDialog} onOpenChange={setDeliveryTypeDialog}>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {editingDeliveryType ? 'Edit Delivery Type' : 'Add New Delivery Type'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                {editingDeliveryType
                                                    ? 'Update the delivery type information below.'
                                                    : 'Add a new delivery type to the platform.'}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DeliveryTypeForm
                                            deliveryType={editingDeliveryType}
                                            onSave={handleSaveDeliveryType}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Audit Log Tab */}
                    <TabsContent value="audit" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>System Audit Log</CardTitle>
                                <CardDescription>
                                    Track all important actions performed in the system
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex gap-2">
                                        <Select value={actionFilter} onValueChange={setActionFilter}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="Action" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Actions</SelectItem>
                                                <SelectItem value="create">Create</SelectItem>
                                                <SelectItem value="update">Update</SelectItem>
                                                <SelectItem value="delete">Delete</SelectItem>
                                                <SelectItem value="verify">Verify</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select value={userFilter} onValueChange={setUserFilter}>
                                            <SelectTrigger className="w-32">
                                                <SelectValue placeholder="User" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Users</SelectItem>
                                                <SelectItem value="admin">Admins</SelectItem>
                                                <SelectItem value="doctor">Doctors</SelectItem>
                                                <SelectItem value="pharmacy">Pharmacies</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Input
                                        placeholder="Search logs..."
                                        className="max-w-xs"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Timestamp</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Action</TableHead>
                                                <TableHead>Entity</TableHead>
                                                <TableHead>Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredAuditLogs.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell>{log.timestamp}</TableCell>
                                                    <TableCell>{log.user}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="default" className={
                                                            log.action === 'CREATE' ? "bg-blue-100 text-blue-800" :
                                                                log.action === 'UPDATE' ? "bg-amber-100 text-amber-800" :
                                                                    log.action === 'DELETE' ? "bg-red-100 text-red-800" :
                                                                        "bg-green-100 text-green-800"
                                                        }>
                                                            {log.action}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{log.entity}</TableCell>
                                                    <TableCell>{log.description}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex items-center justify-end pt-4 space-x-2">
                                    <Button variant="outline" size="sm" disabled>Previous</Button>
                                    <Button variant="outline" size="sm">Next</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* General Settings Tab */}
                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Settings</CardTitle>
                                <CardDescription>
                                    Configure system-wide settings
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Platform Settings</h3>
                                    <Separator />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="platformName">Platform Name</Label>
                                            <Input
                                                id="platformName"
                                                value={generalSettings.platformName}
                                                onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="supportEmail">Support Email</Label>
                                            <Input
                                                id="supportEmail"
                                                value={generalSettings.supportEmail}
                                                type="email"
                                                onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="defaultLanguage">Default Language</Label>
                                            <Select
                                                value={generalSettings.defaultLanguage}
                                                onValueChange={(value) => setGeneralSettings({...generalSettings, defaultLanguage: value})}
                                            >
                                                <SelectTrigger id="defaultLanguage">
                                                    <SelectValue placeholder="Select language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en">English</SelectItem>
                                                    <SelectItem value="sq">Albanian</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dateFormat">Date Format</Label>
                                            <Select
                                                value={generalSettings.dateFormat}
                                                onValueChange={(value) => setGeneralSettings({...generalSettings, dateFormat: value})}
                                            >
                                                <SelectTrigger id="dateFormat">
                                                    <SelectValue placeholder="Select format" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                                    <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Security Settings</h3>
                                    <Separator />

                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Two-Factor Authentication</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Require two-factor authentication for all administrator accounts
                                                </p>
                                            </div>
                                            <Switch
                                                checked={generalSettings.twoFactorAuth}
                                                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, twoFactorAuth: checked})}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Password Policy</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Enforce strong password requirements for all users
                                                </p>
                                            </div>
                                            <Switch
                                                checked={generalSettings.passwordPolicy}
                                                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, passwordPolicy: checked})}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Session Timeout</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Automatically log out inactive users after specified minutes
                                                </p>
                                            </div>
                                            <Switch
                                                checked={generalSettings.sessionTimeout}
                                                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, sessionTimeout: checked})}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="sessionLength">Session Length (minutes)</Label>
                                            <Input
                                                id="sessionLength"
                                                value={generalSettings.sessionLength}
                                                type="number"
                                                className="max-w-xs"
                                                onChange={(e) => setGeneralSettings({...generalSettings, sessionLength: e.target.value})}
                                                disabled={!generalSettings.sessionTimeout}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium">Notification Settings</h3>
                                    <Separator />

                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Email Notifications</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Send email notifications for important system events
                                                </p>
                                            </div>
                                            <Switch
                                                checked={generalSettings.emailNotifications}
                                                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, emailNotifications: checked})}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">System Alerts</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Send alerts about system maintenance and updates
                                                </p>
                                            </div>
                                            <Switch
                                                checked={generalSettings.systemAlerts}
                                                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, systemAlerts: checked})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button onClick={handleSaveGeneralSettings}>Save Settings</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default SettingsPage;