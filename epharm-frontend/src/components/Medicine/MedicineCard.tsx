
import React from 'react';
import { Beaker, Calendar, AlertCircle, Package } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Medicine } from '@/types';

interface MedicineCardProps {
  medicine: Medicine;
  onAdd?: (medicine: Medicine) => void;
  showAddButton?: boolean;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onAdd,
  showAddButton = true,
}) => {
  // Helper function to determine if the medicine is expiring soon (within 30 days)
  const isExpiringSoon = () => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // Helper function to check if medicine is expired
  const isExpired = () => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  // Helper function to check if stock is low (less than 10 items)
  const isLowStock = () => {
    return medicine.stock < 10;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-24 bg-health-light flex items-center justify-center">
        <Beaker className="h-12 w-12 text-health-primary opacity-50" />
      </div>
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="font-bold text-lg">{medicine.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {medicine.description || "No description available"}
          </p>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Price</span>
            <span className="font-medium">${medicine.price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Dosage</span>
            <span className="font-medium">{medicine.dosage}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Stock</span>
            <div className="flex items-center">
              <Package className={`h-4 w-4 mr-1 ${isLowStock() ? 'text-warning' : 'text-muted-foreground'}`} />
              <span className={`font-medium ${isLowStock() ? 'text-warning' : ''}`}>
                {medicine.stock} {medicine.stock === 1 ? 'unit' : 'units'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Expires</span>
            <div className="flex items-center">
              <Calendar className={`h-4 w-4 mr-1 ${
                isExpired() ? 'text-destructive' : 
                isExpiringSoon() ? 'text-warning' : 'text-muted-foreground'
              }`} />
              <span className={`font-medium ${
                isExpired() ? 'text-destructive' : 
                isExpiringSoon() ? 'text-warning' : ''
              }`}>
                {new Date(medicine.expiryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {isLowStock() && (
            <Badge variant="outline" className="text-xs text-warning border-warning">
              Low Stock
            </Badge>
          )}
          {isExpiringSoon() && !isExpired() && (
            <Badge variant="outline" className="text-xs text-warning border-warning">
              Expiring Soon
            </Badge>
          )}
          {isExpired() && (
            <Badge variant="outline" className="text-xs text-destructive border-destructive">
              Expired
            </Badge>
          )}
        </div>
      </CardContent>
      
      {showAddButton && !isExpired() && medicine.stock > 0 && (
        <CardFooter className="bg-gray-50 pt-4">
          <Button
            onClick={() => onAdd && onAdd(medicine)}
            className="w-full"
            variant={isLowStock() ? "outline" : "default"}
          >
            Add to Cart
          </Button>
        </CardFooter>
      )}
      
      {(isExpired() || medicine.stock === 0) && (
        <CardFooter className="bg-gray-50 pt-4">
          <Button
            disabled
            className="w-full"
            variant="outline"
          >
            {isExpired() ? "Expired" : "Out of Stock"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default MedicineCard;