
import React from 'react';
import { Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Medicine } from '@/types';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface MedicineListProps {
  medicines: Medicine[];
  view: 'grid' | 'list';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MedicineList({ medicines, view, onEdit, onDelete }: MedicineListProps) {
  const { toast } = useToast();

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  const isLowStock = (stock: number) => stock < 10;

  const handleEditClick = (id: string) => {
    onEdit(id);
    toast({
      title: "Editing Medicine",
      description: "Redirecting to edit form",
    });
  };

  const handleDeleteSuccess = (id: string) => {
    onDelete(id);
    toast({
      title: "Medicine Deleted",
      description: "Medicine has been successfully removed from inventory",
    });
  };

  if (medicines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted/30 p-6 rounded-full mb-4">
          <AlertTriangle className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No medicines found</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          No medicines match your current filters. Try changing your search criteria.
        </p>
      </div>
    );
  }

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {medicines.map((medicine) => (
          <Card key={medicine.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold">{medicine.name}</h3>
                  <div className="flex gap-1 flex-nowrap">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => handleEditClick(medicine.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {medicine.name} from your inventory. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeleteSuccess(medicine.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {medicine.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-medium">${medicine.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Stock</p>
                    <p className={`font-medium ${isLowStock(medicine.stock) ? 'text-amber-500' : ''}`}>
                      {medicine.stock} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Dosage</p>
                    <p className="font-medium">{medicine.dosage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expires</p>
                    <p className={`font-medium ${
                      isExpired(medicine.expiryDate) ? 'text-red-500' : 
                      isExpiringSoon(medicine.expiryDate) ? 'text-amber-500' : ''
                    }`}>
                      {format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mt-3">
                  {isLowStock(medicine.stock) && (
                    <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                      Low Stock
                    </Badge>
                  )}
                  {isExpiringSoon(medicine.expiryDate) && !isExpired(medicine.expiryDate) && (
                    <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                      Expiring Soon
                    </Badge>
                  )}
                  {isExpired(medicine.expiryDate) && (
                    <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                      Expired
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-gray-500">
                    {medicine.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell className="font-medium">{medicine.name}</TableCell>
              <TableCell>{medicine.category}</TableCell>
              <TableCell>{medicine.dosage}</TableCell>
              <TableCell className="text-right">${medicine.price.toFixed(2)}</TableCell>
              <TableCell className={`text-right ${isLowStock(medicine.stock) ? 'text-amber-500 font-medium' : ''}`}>
                {medicine.stock}
              </TableCell>
              <TableCell className={`${
                isExpired(medicine.expiryDate) ? 'text-red-500 font-medium' : 
                isExpiringSoon(medicine.expiryDate) ? 'text-amber-500 font-medium' : ''
              }`}>
                {format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>
                {isExpired(medicine.expiryDate) && (
                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                    Expired
                  </Badge>
                )}
                {isExpiringSoon(medicine.expiryDate) && !isExpired(medicine.expiryDate) && (
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    Expiring Soon
                  </Badge>
                )}
                {isLowStock(medicine.stock) && !isExpired(medicine.expiryDate) && !isExpiringSoon(medicine.expiryDate) && (
                  <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                    Low Stock
                  </Badge>
                )}
                {!isLowStock(medicine.stock) && !isExpired(medicine.expiryDate) && !isExpiringSoon(medicine.expiryDate) && (
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                    Good
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleEditClick(medicine.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete {medicine.name} from your inventory. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDeleteSuccess(medicine.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}