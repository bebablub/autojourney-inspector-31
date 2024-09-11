import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import CelebrationPopup from '../components/CelebrationPopup';

const Diagnostics = () => {
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

  const startDiagnostics = () => {
    setIsChecking(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsChecking(false);
          setShowCelebration(true);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  const handleShowMe = () => {
    setShowCelebration(false);
    navigate('/reports');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Car Diagnostics</h1>
      <p className="text-xl text-gray-600">
        Click the button below to start the diagnostic process for your vehicle.
      </p>
      
      <Button onClick={startDiagnostics} disabled={isChecking} className="w-full sm:w-auto">
        {isChecking ? 'Running Diagnostics...' : 'Start Diagnostics'}
      </Button>
      
      {isChecking && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-center">Progress: {progress}%</p>
        </div>
      )}

      <CelebrationPopup 
        isOpen={showCelebration} 
        onClose={handleCloseCelebration}
        onShowMe={handleShowMe}
      />
    </div>
  );
};

export default Diagnostics;