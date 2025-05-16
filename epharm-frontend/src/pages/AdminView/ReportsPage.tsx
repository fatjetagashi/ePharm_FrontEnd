
import React, { useState } from 'react';
import DashboardLayout from "@/components/Layout/AdminComponents/DashboardLayout"

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Users, Building, Beaker } from 'lucide-react';
import { toast } from 'sonner';

const ReportsPage = () => {
  // States for various filters
  const [timeframe, setTimeframe] = useState('weekly');
  const [reportType, setReportType] = useState('overview');
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  // Mock data generation function - in a real app, this would be API calls
  const generateMockData = (period: string) => {
    // This would be replaced with real API data in a production app
    
    // Simulating different data for different timeframes
    let multiplier = 1;
    switch (period) {
      case 'monthly':
        multiplier = 4;
        break;
      case 'yearly':
        multiplier = 12;
        break;
      default: // weekly
        multiplier = 1;
        break;
    }

    // Generate prescriptions data
    const prescriptionsData = [
      { name: 'Mon', value: 65 * multiplier, fill: '#0ea5e9' },
      { name: 'Tue', value: 75 * multiplier, fill: '#0ea5e9' },
      { name: 'Wed', value: 85 * multiplier, fill: '#0ea5e9' },
      { name: 'Thu', value: 70 * multiplier, fill: '#0ea5e9' },
      { name: 'Fri', value: 90 * multiplier, fill: '#0ea5e9' },
      { name: 'Sat', value: 50 * multiplier, fill: '#0ea5e9' },
      { name: 'Sun', value: 40 * multiplier, fill: '#0ea5e9' },
    ];
    
    // Generate revenue data
    const revenueData = [
      { name: 'Mon', revenue: 5200 * multiplier, expenses: 3800 * multiplier },
      { name: 'Tue', revenue: 6100 * multiplier, expenses: 4200 * multiplier },
      { name: 'Wed', revenue: 6800 * multiplier, expenses: 4500 * multiplier },
      { name: 'Thu', revenue: 7200 * multiplier, expenses: 4800 * multiplier },
      { name: 'Fri', revenue: 7500 * multiplier, expenses: 5000 * multiplier },
      { name: 'Sat', revenue: 6300 * multiplier, expenses: 4200 * multiplier },
      { name: 'Sun', revenue: 5100 * multiplier, expenses: 3500 * multiplier },
    ];
    
    // Generate usage data
    const usageData = [
      { name: 'Antibiotics', value: 35 * multiplier, fill: '#06b6d4' },
      { name: 'Pain Relief', value: 25 * multiplier, fill: '#0284c7' },
      { name: 'Cardio', value: 20 * multiplier, fill: '#0369a1' },
      { name: 'Vitamins', value: 15 * multiplier, fill: '#0ea5e9' },
      { name: 'Others', value: 5 * multiplier, fill: '#38bdf8' },
    ];

    return { prescriptionsData, revenueData, usageData };
  };
  
  // Generate mock data based on current timeframe
  const { prescriptionsData, revenueData, usageData } = generateMockData(timeframe);

  // Mock data for entity selection
  const mockEntities = {
    prescriptions: [
      { id: 'p1', name: 'General Prescriptions' },
      { id: 'p2', name: 'Emergency Prescriptions' },
      { id: 'p3', name: 'Chronic Condition Prescriptions' },
      { id: 'p4', name: 'Pediatric Prescriptions' },
    ],
    pharmacies: [
      { id: 'ph1', name: 'MediPharm Plus' },
      { id: 'ph2', name: 'City Pharmacy' },
      { id: 'ph3', name: 'HealthPoint Pharmacy' },
      { id: 'ph4', name: 'QuickMeds' },
    ],
    doctors: [
      { id: 'd1', name: 'Dr. John Smith' },
      { id: 'd2', name: 'Dr. Sarah Johnson' },
      { id: 'd3', name: 'Dr. Michael Lee' },
      { id: 'd4', name: 'Dr. Emily Davis' },
    ],
    medicines: [
      { id: 'm1', name: 'Antibiotics Report' },
      { id: 'm2', name: 'Pain Medication Report' },
      { id: 'm3', name: 'Cardiovascular Medication Report' },
      { id: 'm4', name: 'Vitamins & Supplements Report' },
    ],
  };

  // Function to get entities based on current report type
  const getEntitiesForCurrentType = () => {
    switch (reportType) {
      case 'prescriptions':
        return mockEntities.prescriptions;
      case 'pharmacies':
        return mockEntities.pharmacies;
      case 'doctors':
        return mockEntities.doctors;
      case 'medicines':
        return mockEntities.medicines;
      default:
        return [];
    }
  };

  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    toast.success(`Reports updated for ${value === 'weekly' ? 'last week' : value === 'monthly' ? 'last month' : 'last year'}`);
  };

  // Handle report type change
  const handleReportTypeChange = (value: string) => {
    setReportType(value);
    setSelectedEntity(null);
  };

  // Handle entity selection
  const handleEntitySelection = (value: string) => {
    setSelectedEntity(value);
    
    // In a real app, this would fetch specific data for this entity
    toast.success(`Loading report for ${value}`);
  };

  // Handle report download
  const handleDownloadReport = () => {
    toast.success('Preparing report for download...');
    // In a real app, this would generate and download a PDF or Excel report
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Analyze performance and usage metrics</p>
          </div>
          <Button onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        <Tabs defaultValue="overview" value={reportType} onValueChange={handleReportTypeChange} className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Prescriptions
            </TabsTrigger>
            <TabsTrigger value="pharmacies" className="flex items-center gap-2">
              <Building className="h-4 w-4" /> Pharmacies
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Doctors
            </TabsTrigger>
            <TabsTrigger value="medicines" className="flex items-center gap-2">
              <Beaker className="h-4 w-4" /> Medicines
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-end mb-4">
              <div className="w-[200px]">
                <Select defaultValue="weekly" value={timeframe} onValueChange={handleTimeframeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Last Week</SelectItem>
                    <SelectItem value="monthly">Last Month</SelectItem>
                    <SelectItem value="yearly">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Prescriptions Processed Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Prescriptions Processed</CardTitle>
                  <CardDescription>Daily prescriptions filled across all pharmacies</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prescriptionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Prescriptions" fill="#0ea5e9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Total: {prescriptionsData.reduce((acc, item) => acc + item.value, 0)} prescriptions
                  </div>
                </CardFooter>
              </Card>

              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue & Expenses</CardTitle>
                  <CardDescription>Financial performance trends</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0ea5e9" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm text-muted-foreground">
                    Net Profit: ${revenueData.reduce((acc, item) => acc + item.revenue - item.expenses, 0).toLocaleString()}
                  </div>
                </CardFooter>
              </Card>

              {/* Medication Categories Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Medication Categories</CardTitle>
                  <CardDescription>Distribution by prescription type</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {usageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Key metrics for the selected period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">Total Prescriptions</p>
                        <h3 className="text-3xl font-bold text-health-primary mt-1">
                          {prescriptionsData.reduce((acc, item) => acc + item.value, 0)}
                        </h3>
                        <p className="text-xs text-green-600 mt-2">+12% from previous period</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <h3 className="text-3xl font-bold text-health-primary mt-1">
                          ${revenueData.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()}
                        </h3>
                        <p className="text-xs text-green-600 mt-2">+8% from previous period</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">Active Patients</p>
                        <h3 className="text-3xl font-bold text-health-primary mt-1">
                          {Math.floor(prescriptionsData.reduce((acc, item) => acc + item.value, 0) * 0.8)}
                        </h3>
                        <p className="text-xs text-green-600 mt-2">+5% from previous period</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">New Patients</p>
                        <h3 className="text-3xl font-bold text-health-primary mt-1">
                          {Math.floor(prescriptionsData.reduce((acc, item) => acc + item.value, 0) * 0.2)}
                        </h3>
                        <p className="text-xs text-green-600 mt-2">+15% from previous period</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Detail Report Tabs */}
          {["prescriptions", "pharmacies", "doctors", "medicines"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              {/* Filter Bar */}
              <div className="flex justify-between items-center mb-4">
                <div className="w-[300px]">
                  <Select value={selectedEntity || ""} onValueChange={handleEntitySelection}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${tabValue}...`} />
                    </SelectTrigger>
                    <SelectContent>
                      {getEntitiesForCurrentType().map((entity) => (
                        <SelectItem key={entity.id} value={entity.id}>
                          {entity.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-[200px]">
                  <Select defaultValue="weekly" value={timeframe} onValueChange={handleTimeframeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Last Week</SelectItem>
                      <SelectItem value="monthly">Last Month</SelectItem>
                      <SelectItem value="yearly">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Report Content */}
              {selectedEntity ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Activity Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Overview</CardTitle>
                      <CardDescription>
                        {reportType === 'prescriptions' && 'Prescription trends over time'}
                        {reportType === 'pharmacies' && 'Pharmacy activity metrics'}
                        {reportType === 'doctors' && 'Doctor\'s prescription history'}
                        {reportType === 'medicines' && 'Medicine usage statistics'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={prescriptionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" name="Activity" fill="#0ea5e9" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Summary Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Summary</CardTitle>
                      <CardDescription>Key metrics for {
                        getEntitiesForCurrentType().find(e => e.id === selectedEntity)?.name
                      }</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-muted-foreground">Total Activity</p>
                            <h3 className="text-3xl font-bold text-health-primary mt-1">
                              {prescriptionsData.reduce((acc, item) => acc + item.value, 0)}
                            </h3>
                            <p className="text-xs text-green-600 mt-2">+12% from previous period</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-muted-foreground">{
                              reportType === 'prescriptions' ? 'Revenue' :
                              reportType === 'pharmacies' ? 'Orders' :
                              reportType === 'doctors' ? 'Patients' :
                              'Inventory'
                            }</p>
                            <h3 className="text-3xl font-bold text-health-primary mt-1">
                              {reportType === 'prescriptions' && '$'}
                              {Math.floor(prescriptionsData.reduce((acc, item) => acc + item.value, 0) * 1.5).toLocaleString()}
                            </h3>
                            <p className="text-xs text-green-600 mt-2">+8% from previous period</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-muted-foreground">{
                              reportType === 'prescriptions' ? 'Coverage' :
                              reportType === 'pharmacies' ? 'Satisfaction' :
                              reportType === 'doctors' ? 'Rating' :
                              'Availability'
                            }</p>
                            <h3 className="text-3xl font-bold text-health-primary mt-1">
                              {Math.floor(80 + Math.random() * 15)}%
                            </h3>
                            <p className="text-xs text-green-600 mt-2">+5% from previous period</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <p className="text-sm text-muted-foreground">Growth</p>
                            <h3 className="text-3xl font-bold text-health-primary mt-1">
                              +{Math.floor(10 + Math.random() * 15)}%
                            </h3>
                            <p className="text-xs text-green-600 mt-2">+3% from previous period</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Distribution Chart */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Detailed Analysis</CardTitle>
                      <CardDescription>
                        {reportType === 'prescriptions' && 'Prescription type breakdown'}
                        {reportType === 'pharmacies' && 'Pharmacy performance metrics'}
                        {reportType === 'doctors' && 'Doctor\'s specialty performance'}
                        {reportType === 'medicines' && 'Medicine usage by category'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={usageData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {usageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleDownloadReport} className="ml-auto">
                        <Download className="mr-2 h-4 w-4" /> Download Full Report
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-md">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    {reportType === 'prescriptions' && <FileText className="h-8 w-8 text-gray-500" />}
                    {reportType === 'pharmacies' && <Building className="h-8 w-8 text-gray-500" />}
                    {reportType === 'doctors' && <Users className="h-8 w-8 text-gray-500" />}
                    {reportType === 'medicines' && <Beaker className="h-8 w-8 text-gray-500" />}
                  </div>
                  <h3 className="text-lg font-medium">Select a {reportType.slice(0, -1)} to view reports</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Choose from the dropdown above to view detailed analytics and reports for specific {reportType}.
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
