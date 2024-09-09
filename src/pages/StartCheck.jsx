import React, { useState } from 'react';
import Navigation from '../components/Navigation';
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
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Start HV-Check</h1>
        <p className="mb-4">Click the button below to start the HV-Check process.</p>
        
        <Button onClick={startHVCheck} disabled={isChecking}>
          {isChecking ? 'Checking...' : 'Start HV-Check'}
        </Button>
        
        {isChecking && (
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="mt-2">Progress: {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartCheck;