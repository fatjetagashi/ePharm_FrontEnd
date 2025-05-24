
import React from 'react';
import MedicationCard from './MedicationCard';
import { MedicationItem } from '@/types';

interface MedicationListProps {
  medications: MedicationItem[];
  takenIntakes: {[key: string]: string[]};
  onMarkAsTaken: (id: string, intakeTime: string) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({
  medications,
  takenIntakes,
  onMarkAsTaken
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {medications.map(medication => (
        <MedicationCard
          key={medication.id}
          medication={medication}
          takenIntakes={takenIntakes[medication.id] || []}
          onMarkAsTaken={onMarkAsTaken}
        />
      ))}
    </div>
  );
};

export default MedicationList;