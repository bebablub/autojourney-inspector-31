import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import CelebrationPopup from '../components/CelebrationPopup';
import RotatingProgressBar from '../components/RotatingProgressBar';

const StartCheck = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

  const checkSteps = [
    { progress: 20, status: 'Connecting to the car...' },
    { progress: 40, status: 'Identifying car: ID.3 84kWh' },
    { progress: 60, status: 'Scanning control units' },
    { progress: 80, status: '40 control units scanned' },
    { progress: 95, status: 'Preparing protocol' },
    { progress: 100, status: 'HV-Check complete!' },
  ];

  useEffect(() => {
    if (isChecking) {
      let step = 0;
      const interval = setInterval(() => {
        if (step < checkSteps.length) {
          setProgress(checkSteps[step].progress);
          setStatus(checkSteps[step].status);
          step++;
        } else {
          clearInterval(interval);
          setIsChecking(false);
          setShowCelebration(true);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isChecking]);

  const startHVCheck = () => {
    setIsChecking(true);
    setProgress(0);
    setStatus('Initializing HV-Check...');
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  const handleShowMe = () => {
    setShowCelebration(false);
    navigate('/reports');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Start HV-Check</h1>
      
      {!isChecking && progress === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-8">
            Ready to ensure your vehicle's high-voltage system is in top shape? Click the button below to start the HV-Check process.
          </p>
          <Button onClick={startHVCheck} size="lg" className="text-lg px-8 py-4">
            Start HV-Check
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <RotatingProgressBar progress={progress} status={status} />
          <p className="mt-4 text-lg text-gray-600">
            {status}
          </p>
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

export default StartCheck;