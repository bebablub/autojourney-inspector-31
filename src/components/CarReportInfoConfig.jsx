import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

const CarReportInfoConfig = () => {
  const [selectedInfo, setSelectedInfo] = useState({
    vin: true,
    make: true,
    model: true,
    year: true,
    mileage: true,
    batteryCapacity: true,
    reportDate: true,
    reportId: true,
    inspectorName: true,
    inspectorId: true,
    location: true
  });

  const handleInfoChange = (infoName) => {
    setSelectedInfo(prev => ({
      ...prev,
      [infoName]: !prev[infoName]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Car and Report Basic Info</h2>
      {Object.entries(selectedInfo).map(([key, value]) => (
        <div key={key} className="flex items-center mb-2">
          <Checkbox
            id={`carInfo-${key}`}
            checked={value}
            onCheckedChange={() => handleInfoChange(key)}
          />
          <label htmlFor={`carInfo-${key}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CarReportInfoConfig;