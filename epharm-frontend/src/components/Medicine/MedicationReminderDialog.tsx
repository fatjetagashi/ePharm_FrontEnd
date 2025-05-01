
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface MedicationReminderDialogProps {
  medicationName: string;
  dosage: string;
  initialReminders: {
    enabled: boolean;
    customTimes: string[];
  };
}

const MedicationReminderDialog: React.FC<MedicationReminderDialogProps> = ({
  medicationName,
  dosage,
  initialReminders
}) => {
  const [openReminder, setOpenReminder] = useState(false);
  const [reminderSettings, setReminderSettings] = useState(initialReminders);

  const handleSaveReminders = () => {
    toast({
      title: "Reminder settings updated",
      description: `Reminder settings for ${medicationName} ${dosage} have been saved.`,
    });
    setOpenReminder(false);
  };

  return (
    <Dialog open={openReminder} onOpenChange={setOpenReminder}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bell className="mr-2 h-4 w-4" />
          {reminderSettings.enabled ? "Edit Reminders" : "Set Reminders"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Medication Reminders</DialogTitle>
          <DialogDescription>
            Customize reminders for {medicationName} {dosage}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reminder-toggle">Enable Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when it's time to take your medication
              </p>
            </div>
            <Switch 
              id="reminder-toggle"
              checked={reminderSettings.enabled}
              onCheckedChange={(checked) => 
                setReminderSettings(prev => ({...prev, enabled: checked}))
              }
            />
          </div>
          
          {reminderSettings.enabled && (
            <div className="space-y-2">
              <Label>Reminder Times</Label>
              {reminderSettings.customTimes.map((time, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input 
                    type="time" 
                    value={time.includes(':') ? time.split(' ')[0] : '08:00'} 
                    onChange={(e) => {
                      const newTimes = [...reminderSettings.customTimes];
                      newTimes[idx] = e.target.value;
                      setReminderSettings(prev => ({...prev, customTimes: newTimes}));
                    }}
                    className="w-32"
                  />
                  <span className="text-sm text-muted-foreground">
                    {idx === 0 ? 'First dose' : idx === 1 ? 'Second dose' : `Dose ${idx + 1}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenReminder(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveReminders}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationReminderDialog;
