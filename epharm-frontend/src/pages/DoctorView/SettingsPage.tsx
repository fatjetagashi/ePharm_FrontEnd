
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';
import { User, Bell, Shield, Key, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
    const { toast } = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast({
                title: "Error",
                description: "All password fields are required",
                variant: "destructive"
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "New passwords don't match",
                variant: "destructive"
            });
            return;
        }

        // In a real app, you would send a request to your backend
        // For this demo, we'll simulate a successful update
        toast({
            title: "Success",
            description: "Your password has been updated successfully",
        });

        // Clear form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center gap-2">
                            <Bell className="h-4 w-4" />
                            <span>Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>Security</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>
                                    Update your personal details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" defaultValue="Jane Doe" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" defaultValue="jane.doe@example.com" type="email" />
                                    </div>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="license">License Number</Label>
                                        <Input id="license" defaultValue="ABCD123456" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" defaultValue="123 Main St, Apt 4B" />
                                </div>

                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" defaultValue="New York" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state" defaultValue="NY" />
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" defaultValue="10001" />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                                <CardDescription>
                                    Update your profile picture
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                        <User className="h-12 w-12 text-gray-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Button size="sm">Upload New Picture</Button>
                                        <p className="text-xs text-muted-foreground">
                                            JPG, GIF or PNG. Max size of 2MB.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Choose what notifications you receive
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Email Notifications</h3>
                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">New Prescriptions</p>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when a doctor issues a new prescription for you.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Medication Reminders</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive reminders when it's time to take your medication.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Prescription Expiration</p>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when your prescriptions are about to expire.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">System Updates</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive updates about new features and changes to ePharm.
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6">
                                    <h3 className="text-sm font-medium">Mobile Notifications</h3>
                                    <Separator />

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Push Notifications</p>
                                            <p className="text-sm text-muted-foreground">
                                                Enable push notifications on your mobile device.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">SMS Notifications</p>
                                            <p className="text-sm text-muted-foreground">
                                                Receive important notifications via SMS.
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button>Save Preferences</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Change Password</CardTitle>
                                <CardDescription>
                                    Update your password to keep your account secure
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handleUpdatePassword}>
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input
                                            id="currentPassword"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button type="submit">Update Password</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Two-Factor Authentication</CardTitle>
                                <CardDescription>
                                    Add an extra layer of security to your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Enable Two-Factor Authentication</p>
                                        <p className="text-sm text-muted-foreground">
                                            Protect your account with an additional security layer.
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="pt-4">
                                    <Button variant="outline">
                                        <Shield className="mr-2 h-4 w-4" />
                                        Setup Two-Factor Authentication
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Session Management</CardTitle>
                                <CardDescription>
                                    Manage your active sessions and devices
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <Key className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Current Session</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Chrome on Windows • IP: 192.168.1.1
                                                </p>
                                            </div>
                                        </div>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Key className="h-5 w-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Mobile App</p>
                                                <p className="text-sm text-muted-foreground">
                                                    iPhone 12 • IP: 192.168.1.2
                                                </p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">Logout</Button>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button variant="outline" className="text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout from All Devices
                                    </Button>
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

