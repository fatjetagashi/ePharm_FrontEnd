
import React from 'react';
import { Building, MapPin, Phone, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pharmacy } from '@/types';

interface PharmacyCardProps {
  pharmacy: Partial<Pharmacy> & {
    distance?: string;
    rating?: number;
    discount?: number;
    isOpen?: boolean;
    deliveryOptions?: string[];
  };
  onSelect?: (pharmacyId: string) => void;
  showSelectButton?: boolean;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({
  pharmacy,
  onSelect,
  showSelectButton = true,
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 bg-pharmacy-light flex items-center justify-center">
        {pharmacy.logo ? (
          <img
            src={pharmacy.logo}
            alt={pharmacy.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Building className="h-16 w-16 text-pharmacy-primary opacity-50" />
        )}
      </div>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{pharmacy.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{pharmacy.address || "123 Health St."}</span>
            </div>
          </div>
          {pharmacy.isOpen !== undefined && (
            <Badge variant={pharmacy.isOpen ? "outline" : "secondary"} className={pharmacy.isOpen ? "text-green-600 bg-green-50" : ""}>
              {pharmacy.isOpen ? "Open" : "Closed"}
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {pharmacy.distance && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Distance</span>
              <span className="font-medium">{pharmacy.distance}</span>
            </div>
          )}
          
          {pharmacy.discount !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ePharm Discount</span>
              <span className="font-medium text-pharmacy-primary">{pharmacy.discount}%</span>
            </div>
          )}
          
          {pharmacy.phone && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{pharmacy.phone}</span>
            </div>
          )}

          {pharmacy.rating !== undefined && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Rating</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{pharmacy.rating.toFixed(1)}</span>
              </div>
            </div>
          )}
        </div>

        {pharmacy.deliveryOptions && pharmacy.deliveryOptions.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {pharmacy.deliveryOptions.map((option, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {option}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      {showSelectButton && (
        <CardFooter className="bg-gray-50 pt-4">
          <Button
            onClick={() => onSelect && pharmacy.id && onSelect(pharmacy.id)}
            className="w-full bg-pharmacy-primary hover:bg-pharmacy-primary/90"
          >
            Select Pharmacy
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PharmacyCard;