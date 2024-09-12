import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

const CarIdentification = () => {
  const [identifying, setIdentifying] = useState(true);
  const [carInfo, setCarInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const identifyCar = async () => {
      // Simulating API call for car identification
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCarInfo({
        make: 'Volkswagen',
        model: 'ID.4',
        year: 2023,
        batteryCapacity: '77 kWh'
      });
      setIdentifying(false);
    };

    identifyCar();
  }, []);

  const handleContinue = () => {
    navigate('/start-check', { state: { carInfo } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Car Identification</CardTitle>
          <CardDescription>We're identifying your vehicle...</CardDescription>
        </CardHeader>
        <CardContent>
          {identifying ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="mt-4">Please wait while we identify your vehicle...</p>
            </div>
          ) : (
            <div>
              <p className="mb-4">We've identified your vehicle:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Make: {carInfo.make}</li>
                <li>Model: {carInfo.model}</li>
                <li>Year: {carInfo.year}</li>
                <li>Battery Capacity: {carInfo.batteryCapacity}</li>
              </ul>
              <Button onClick={handleContinue} className="w-full">Continue to Diagnostics</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarIdentification;