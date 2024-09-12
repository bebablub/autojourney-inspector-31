import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

const CarIdentification = () => {
  const [identifying, setIdentifying] = useState(true);
  const [carInfo, setCarInfo] = useState(null);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    "Initializing AI-powered identification...",
    "Analyzing vehicle characteristics...",
    "Matching with database...",
    "Verifying results...",
    "Finalizing identification..."
  ];

  useEffect(() => {
    const identifyCar = async () => {
      for (let i = 0; i < steps.length; i++) {
        setStep(i);
        // Simulate API call for each step
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
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
          <CardTitle>AI Car Identification</CardTitle>
          <CardDescription>We're using advanced AI to identify your vehicle</CardDescription>
        </CardHeader>
        <CardContent>
          {identifying ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-center mb-2">{steps[step]}</p>
              <div className="w-full bg-secondary rounded-full h-2.5 dark:bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(step + 1) / steps.length * 100}%` }}></div>
              </div>
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