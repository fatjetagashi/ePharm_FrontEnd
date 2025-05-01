
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import MedicationList from '@/components/Medicine/MedicationList';
import { MedicationItem } from '@/types';

// Mock medication data
const medications: MedicationItem[] = [
  {
    id: '1',
    name: 'Amoxicillin',
    dosage: '500mg',
    frequency: '3 times daily',
    intakeTimes: ['8:00 AM', '2:00 PM', '8:00 PM'],
    duration: '7 days',
    remainingDoses: 18,
    reminderEnabled: true,
    prescriptionId: '101',
    status: 'active'
  },
  {
    id: '2',
    name: 'Ibuprofen',
    dosage: '400mg',
    frequency: 'As needed',
    intakeTimes: ['When needed for pain'],
    duration: '10 days',
    remainingDoses: 15,
    reminderEnabled: false,
    prescriptionId: '101',
    status: 'active'
  },
  {
    id: '3',
    name: 'Vitamin D',
    dosage: '1000 IU',
    frequency: 'Once daily',
    intakeTimes: ['8:30 PM'],
    duration: '30 days',
    remainingDoses: 25,
    reminderEnabled: true,
    prescriptionId: '102',
    status: 'active'
  },
  {
    id: '4',
    name: 'Loratadine',
    dosage: '10mg',
    frequency: 'Once daily',
    intakeTimes: ['Morning'],
    duration: '30 days',
    remainingDoses: 0,
    reminderEnabled: false,
    prescriptionId: '102',
    status: 'completed'
  }
];

const MedicinesPage = () => {
  const activeMedications = medications.filter(med => med.status === 'active');
  const completedMedications = medications.filter(med => med.status === 'completed');
  const [todayIntakes, setTodayIntakes] = useState<{[key: string]: string[]}>({});

  const handleMarkAsTaken = (medicationId: string, intakeTime: string) => {
    setTodayIntakes(prev => {
      const current = {...prev};
      if (!current[medicationId]) {
        current[medicationId] = [];
      }
      
      if (!current[medicationId].includes(intakeTime)) {
        current[medicationId] = [...current[medicationId], intakeTime];
      }
      
      return current;
    });
    
    toast({
      title: "Medication marked as taken",
      description: `You've successfully recorded this dose.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Medications</h1>
          <p className="text-muted-foreground">Track your medications and set reminders</p>
        </div>
        
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active Medications</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <MedicationList 
              medications={activeMedications}
              takenIntakes={todayIntakes}
              onMarkAsTaken={handleMarkAsTaken}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <MedicationList 
              medications={completedMedications}
              takenIntakes={todayIntakes}
              onMarkAsTaken={handleMarkAsTaken}
            />
          </TabsContent>
          
          <TabsContent value="all" className="mt-6">
            <MedicationList 
              medications={medications}
              takenIntakes={todayIntakes}
              onMarkAsTaken={handleMarkAsTaken}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MedicinesPage;
