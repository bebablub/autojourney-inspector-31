import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import CelebrationPopup from '../components/CelebrationPopup';

const StartCheck = () => {
  const [progress, setProgress] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

  const startHVCheck = () => {
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
    navigate('/reports');
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

      <CelebrationPopup isOpen={showCelebration} onClose={handleCloseCelebration} />
    </div>
  );
};

export default StartCheck;