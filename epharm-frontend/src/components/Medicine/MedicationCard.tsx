
import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MedicationReminderDialog from './MedicationReminderDialog';
import { MedicationItem } from '@/types';

interface MedicationCardProps {
  medication: MedicationItem;
  takenIntakes: string[];
  onMarkAsTaken: (id: string, intakeTime: string) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  takenIntakes,
  onMarkAsTaken,
}) => {
  return (
    <Card className={medication.status === 'completed' ? 'border-green-300' : 'border-blue-300'}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{medication.name} {medication.dosage}</CardTitle>
          <Badge variant={medication.status === 'completed' ? "outline" : "default"}>
            {medication.status === 'completed' ? 'Completed' : `${medication.remainingDoses} doses left`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Frequency</p>
              <p className="font-medium">{medication.frequency}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{medication.duration}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">Today's Schedule</p>
            <div className="space-y-2">
              {medication.intakeTimes.map((time, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-700" />
                    </div>
                    <span>{time}</span>
                  </div>
                  
                  {takenIntakes.includes(time) ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Taken</span>
                    </div>
                  ) : medication.status !== 'completed' && (
                    <Button 
                      size="sm" 
                      onClick={() => onMarkAsTaken(medication.id, time)}
                    >
                      Mark as Taken
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <MedicationReminderDialog
              medicationName={medication.name}
              dosage={medication.dosage}
              initialReminders={{
                enabled: medication.reminderEnabled,
                customTimes: medication.intakeTimes
              }}
            />
            
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationCard;