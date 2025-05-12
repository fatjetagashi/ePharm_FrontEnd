
import React, { useState } from 'react';
import DashboardLayout from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/Layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/card';
import { Button } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/button';
import { Input } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/input';
import { Label } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/tabs';
import { User, Mail, Key, Shield } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  // Mock user data - in a real app, this would come from authentication context or API
  const [userData, setUserData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@epharm.com',
    role: 'Admin',
    department: 'IT Management',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 15, 2023',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Profile update handler
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would make an API call to update the profile
    toast.success('Profile information updated successfully');
  };

  // Password update handler
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    // In a real app, you would make an API call to update the password
    toast.success('Password updated successfully');
    
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-health-primary text-white rounded-full flex items-center justify-center text-3xl">
                  {userData.fullName.charAt(0)}
                </div>
              </div>
              <CardTitle className="text-center">{userData.fullName}</CardTitle>
              <CardDescription className="text-center">{userData.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{userData.department}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Member since {userData.joinDate}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Settings Tabs */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your profile and security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-4 pt-4">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          value={userData.fullName} 
                          onChange={(e) => setUserData({...userData, fullName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          value={userData.department}
                          onChange={(e) => setUserData({...userData, department: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </TabsContent>
                
                {/* Security Tab */}
                <TabsContent value="security" className="space-y-4 pt-4">
                  <form onSubmit={handlePasswordUpdate}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword" 
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Activity Log or Additional Info */}
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Advanced security settings and options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('Two-factor authentication coming soon')}>
                  Enable
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-medium">Session Management</h3>
                  <p className="text-sm text-muted-foreground">Manage your active sessions across different devices</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('Session management coming soon')}>
                  Manage
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                <div>
                  <h3 className="font-medium">Recovery Options</h3>
                  <p className="text-sm text-muted-foreground">Set up account recovery methods</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('Recovery options coming soon')}>
                  Configure
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                For security concerns, please contact the IT department
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
