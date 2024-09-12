import React from 'react';
import { useVehicle } from '../contexts/VehicleContext';
import { Card, CardContent } from "@/components/ui/card";

const VehicleInfo = () => {
  const { vehicleInfo } = useVehicle();

  if (!vehicleInfo) return null;

  return (
    <Card className="bg-secondary text-secondary-foreground mb-4 mx-4">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img src={`/logos/${vehicleInfo.make.toLowerCase()}.svg`} alt={`${vehicleInfo.make} logo`} className="w-12 h-12" />
        </div>
        <div>
          <h3 className="font-semibold">{vehicleInfo.make} {vehicleInfo.model}</h3>
          <p className="text-sm">{vehicleInfo.year} - Battery: {vehicleInfo.batteryCapacity}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleInfo;