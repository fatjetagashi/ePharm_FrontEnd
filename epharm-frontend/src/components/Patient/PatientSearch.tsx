
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
  licenseNumber: string;
  birthdate: string;
  gender: string;
  address: string;
}

interface PatientSearchProps {
  onPatientSelect: (patient: Patient) => void;
  onRegisterNew: () => void;
}

const PatientSearch = ({ onPatientSelect, onRegisterNew }: PatientSearchProps) => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const { toast } = useToast();

  // This would be replaced with an actual API call to search for patients
  const handleSearch = () => {
    // Mock data - in a real app, this would be an API call
    const mockPatients = [
      { 
        id: '101', 
        name: 'John Smith', 
        licenseNumber: 'LIC12345', 
        birthdate: '1985-05-15',
        gender: 'Male',
        address: '123 Main St, New York, NY'
      },
      { 
        id: '102', 
        name: 'Jane Doe', 
        licenseNumber: 'LIC67890', 
        birthdate: '1992-08-22',
        gender: 'Female',
        address: '456 Park Ave, Boston, MA'
      },
    ];

    const results = mockPatients.filter(patient => 
      patient.licenseNumber.toLowerCase().includes(licenseNumber.toLowerCase())
    );
    
    setSearchResults(results);

    if (results.length === 0) {
      toast({
        title: "No patients found",
        description: "No patients found with this license number. Please register a new patient.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Search by License Number</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Enter patient license number..."
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Search for existing patients by their license number in the ePharm system.
        </p>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <Label>Search Results</Label>
          <div className="space-y-2">
            {searchResults.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                onClick={() => onPatientSelect(patient)}
              >
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">
                    License: {patient.licenseNumber} • DOB: {new Date(patient.birthdate).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm">Select</Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          variant="outline"
          onClick={onRegisterNew}
        >
          Register New Patient
        </Button>
      </div>
    </div>
  );
};

export default PatientSearch;