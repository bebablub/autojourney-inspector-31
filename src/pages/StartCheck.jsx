import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

const StartCheck = () => {
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

  const startHVCheck = () => {
    setIsChecking(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsChecking(false);
          navigate('/reports');
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Start HV-Check</h1>
      <p className="text-xl text-gray-600">
        Click the button below to start the HV-Check process.
      </p>
      
      <Button onClick={startHVCheck} disabled={isChecking} className="w-full sm:w-auto">
        {isChecking ? 'Checking...' : 'Start HV-Check'}
      </Button>
      
      {isChecking && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-center">Progress: {progress}%</p>
        </div>
      )}
    </div>
  );
};

export default StartCheck;