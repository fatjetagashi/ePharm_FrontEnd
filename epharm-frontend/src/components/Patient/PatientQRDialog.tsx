import React from 'react';
import { QrCode } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PatientQRDialogProps {
  patientInfo: {
    name: string;
    patientId: string;
    email: string;
  };
}

const PatientQRDialog: React.FC<PatientQRDialogProps> = ({ patientInfo }) => {
  const generateQRPattern = (id: string) => {
    const hash = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100;

    const pattern = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        if ((i === 0 || i === 4) && (j === 0 || j === 4) || (i === 2 && j === 2)) {
          row.push(1);
        } else {
          row.push(((hash + i * j) % 3 === 0) ? 1 : 0);
        }
      }
      pattern.push(row);
    }
    return pattern;
  };

  const qrPattern = generateQRPattern(patientInfo.patientId);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <QrCode className="h-4 w-4" />
            Show QR Code
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Patient QR Code</DialogTitle>
            <DialogDescription>
              Show this QR code to your doctor during visits for quick access to your patient information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded flex items-center justify-center p-2">
                <div className="grid grid-cols-5 gap-1 w-full h-full">
                  {qrPattern.map((row, rowIndex) =>
                      row.map((cell, cellIndex) => (
                          <div
                              key={`${rowIndex}-${cellIndex}`}
                              className={`aspect-square ${cell ? 'bg-black' : 'bg-white'}`}
                          />
                      ))
                  )}
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">{user?.name ?? patientInfo.name}</p>
              <p className="text-sm text-gray-500">ID: {user?.id ?? patientInfo.patientId}</p>
              <p className="text-sm text-gray-500">{user?.email ?? patientInfo.email}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default PatientQRDialog;