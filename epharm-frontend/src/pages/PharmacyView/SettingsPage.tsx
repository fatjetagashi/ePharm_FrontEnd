
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
import { Settings, User, Building, Bell, Lock, Shield, Store } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [accountForm, setAccountForm] = useState({
    name: 'John Doe',
    email: 'john.doe@medipharm.com',
    phone: '(555) 123-4567',
  });

  const [pharmacyForm, setPharmacyForm] = useState({
    name: 'MediPharm Plus',
    address: '123 Health Street, Medical District, MD 12345',
    phone: '(555) 987-6543',
    email: 'contact@medipharm.com',
    website: 'www.medipharm.com',
    description: 'A full-service pharmacy providing prescription medications, healthcare products, and professional consultation.',
    openingHours: '9:00 AM - 8:00 PM',
    deliveryEnabled: true,
    deliveryRadius: '10',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    lowStockAlerts: true,
    prescriptionAlerts: true,
    orderUpdates: true,
    systemNotices: true,
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account settings updated",
      description: "Your account information has been saved.",
    });
  };

  const handlePharmacySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pharmacy settings updated",
      description: "Your pharmacy information has been saved.",
    });
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved.",
    });
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your new password and confirmation match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-pharmacy-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account, pharmacy, and application settings
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="pharmacy" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>Pharmacy</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAccountSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Full Name</Label>
                        <Input
                          id="account-name"
                          value={accountForm.name}
                          onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-email">Email</Label>
                        <Input
                          id="account-email"
                          type="email"
                          value={accountForm.email}
                          onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-phone">Phone</Label>
                      <Input
                        id="account-phone"
                        value={accountForm.phone}
                        onChange={(e) => setAccountForm({...accountForm, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pharmacy Settings */}
          <TabsContent value="pharmacy">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacy Profile</CardTitle>
                <CardDescription>
                  Update your pharmacy's public information and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePharmacySubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-name">Pharmacy Name</Label>
                        <Input
                          id="pharmacy-name"
                          value={pharmacyForm.name}
                          onChange={(e) => setPharmacyForm({...pharmacyForm, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-phone">Phone</Label>
                        <Input
                          id="pharmacy-phone"
                          value={pharmacyForm.phone}
                          onChange={(e) => setPharmacyForm({...pharmacyForm, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pharmacy-address">Address</Label>
                      <Input
                        id="pharmacy-address"
                        value={pharmacyForm.address}
                        onChange={(e) => setPharmacyForm({...pharmacyForm, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-email">Email</Label>
                        <Input
                          id="pharmacy-email"
                          type="email"
                          value={pharmacyForm.email}
                          onChange={(e) => setPharmacyForm({...pharmacyForm, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pharmacy-website">Website</Label>
                        <Input
                          id="pharmacy-website"
                          value={pharmacyForm.website}
                          onChange={(e) => setPharmacyForm({...pharmacyForm, website: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pharmacy-hours">Opening Hours</Label>
                      <Input
                        id="pharmacy-hours"
                        value={pharmacyForm.openingHours}
                        onChange={(e) => setPharmacyForm({...pharmacyForm, openingHours: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pharmacy-description">Description</Label>
                      <Textarea
                        id="pharmacy-description"
                        rows={4}
                        value={pharmacyForm.description}
                        onChange={(e) => setPharmacyForm({...pharmacyForm, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="delivery-enabled">Enable Delivery</Label>
                        <Switch
                          id="delivery-enabled"
                          checked={pharmacyForm.deliveryEnabled}
                          onCheckedChange={(checked) => setPharmacyForm({...pharmacyForm, deliveryEnabled: checked})}
                        />
                      </div>
                      {pharmacyForm.deliveryEnabled && (
                        <div className="space-y-2">
                          <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                          <Input
                            id="delivery-radius"
                            type="number"
                            value={pharmacyForm.deliveryRadius}
                            onChange={(e) => setPharmacyForm({...pharmacyForm, deliveryRadius: e.target.value})}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Delivery Methods</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <Switch
                            id="email-notifications"
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <Switch
                            id="push-notifications"
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Notification Types</h3>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="low-stock-alerts">Low Stock Alerts</Label>
                          <Switch
                            id="low-stock-alerts"
                            checked={notificationSettings.lowStockAlerts}
                            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockAlerts: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="prescription-alerts">Prescription Alerts</Label>
                          <Switch
                            id="prescription-alerts"
                            checked={notificationSettings.prescriptionAlerts}
                            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, prescriptionAlerts: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="order-updates">Order Updates</Label>
                          <Switch
                            id="order-updates"
                            checked={notificationSettings.orderUpdates}
                            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderUpdates: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="system-notices">System Notices</Label>
                          <Switch
                            id="system-notices"
                            checked={notificationSettings.systemNotices}
                            onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemNotices: checked})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Save Preferences</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecuritySubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={securityForm.newPassword}
                          onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="two-factor" className="text-base font-medium">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          id="two-factor"
                          checked={securityForm.twoFactorEnabled}
                          onCheckedChange={(checked) => setSecurityForm({...securityForm, twoFactorEnabled: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Update Security</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;