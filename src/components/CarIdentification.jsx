import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';

const CarIdentification = () => {
  const [stage, setStage] = useState('identifying');
  const [progress, setProgress] = useState(0);
  const [carInfo, setCarInfo] = useState(null);
  const navigate = useNavigate();

  const stages = [
    { id: 'identifying', steps: [
      "Initializing AI-powered identification...",
      "Analyzing vehicle characteristics...",
      "Matching with database...",
      "Verifying results...",
      "Finalizing identification..."
    ]},
    { id: 'reading', steps: [
      "Connecting to vehicle ECUs...",
      "Reading diagnostic trouble codes...",
      "Retrieving live data parameters...",
      "Analyzing ECU information...",
      "Compiling diagnostic data..."
    ]},
    { id: 'beautifying', steps: [
      "Organizing diagnostic information...",
      "Generating visual representations...",
      "Applying report template...",
      "Optimizing layout and formatting...",
      "Finalizing report design..."
    ]}
  ];

  useEffect(() => {
    const runStage = async (stageId) => {
      const currentStage = stages.find(s => s.id === stageId);
      setStage(stageId);
      setProgress(0);

      for (let i = 0; i < currentStage.steps.length; i++) {
        setProgress((i + 1) / currentStage.steps.length * 100);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      if (stageId === 'identifying') {
        setCarInfo({
          make: 'Volkswagen',
          model: 'ID.4',
          year: 2023,
          batteryCapacity: '77 kWh'
        });
        runStage('reading');
      } else if (stageId === 'reading') {
        runStage('beautifying');
      } else {
        setStage('complete');
      }
    };

    runStage('identifying');
  }, []);

  const handleContinue = () => {
    navigate('/report', { state: { carInfo } });
  };

  const getCurrentStage = () => stages.find(s => s.id === stage);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>AI-Powered Vehicle Analysis</CardTitle>
          <CardDescription>We're analyzing your vehicle and preparing a comprehensive report</CardDescription>
        </CardHeader>
        <CardContent>
          {stage !== 'complete' ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin mb-4" />
              <p className="text-center mb-2">{getCurrentStage().steps[Math.floor((progress / 100) * getCurrentStage().steps.length)]}</p>
              <div className="w-full bg-secondary rounded-full h-2.5 dark:bg-secondary">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">Analysis complete! Your report is ready.</p>
              <Button onClick={handleContinue} className="w-full">View Report</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarIdentification;