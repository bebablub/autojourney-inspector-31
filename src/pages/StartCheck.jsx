import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import CelebrationPopup from '../components/CelebrationPopup';
import RotatingProgressBar from '../components/RotatingProgressBar';
import ConfettiAnimation from '../components/ConfettiAnimation';
import { motion } from 'framer-motion';

const checkSteps = [
  { progress: 20, status: 'Connecting to the car...' },
  { progress: 40, status: 'Scanning control units' },
  { progress: 60, status: 'Analyzing data' },
  { progress: 80, status: 'Preparing report' },
  { progress: 100, status: 'Report complete!' },
];

const StartCheck = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const carInfo = location.state?.carInfo;

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

  const startReport = () => {
    if (!carInfo) {
      navigate('/car-identification');
    } else {
      setIsChecking(true);
      setProgress(0);
      setStatus('Initializing Report...');
    }
  };

  const handleCloseCelebration = () => setShowCelebration(false);
  const handleShowMe = () => {
    setShowCelebration(false);
    navigate('/reports');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Start Report</h1>
      
      {!isChecking && progress === 0 ? (
        <StartButton startReport={startReport} carInfo={carInfo} />
      ) : (
        <ProgressDisplay progress={progress} status={status} carInfo={carInfo} />
      )}

      {showCelebration && <ConfettiAnimation />}
      <CelebrationPopup 
        isOpen={showCelebration} 
        onClose={handleCloseCelebration}
        onShowMe={handleShowMe}
      />
    </div>
  );
};

const StartButton = ({ startReport, carInfo }) => (
  <div className="text-center">
    <p className="text-xl text-muted-foreground mb-8">
      Ready to ensure your vehicle's high-voltage system is in top shape? Click the button below to start the Report process.
    </p>
    <Button onClick={startReport} size="lg" className="text-2xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-green-500 hover:bg-green-600">
      {carInfo ? 'Start Report' : 'Identify Car'}
    </Button>
    {carInfo && (
      <p className="mt-4 text-sm text-muted-foreground">
        {`${carInfo.make} ${carInfo.model} (${carInfo.year}) - ${carInfo.batteryCapacity}`}
      </p>
    )}
  </div>
);

const ProgressDisplay = ({ progress, status, carInfo }) => (
  <div className="text-center w-full max-w-2xl">
    <div className="relative mb-8">
      <RotatingProgressBar progress={progress} status={status} />
    </div>
    <p className="mt-4 text-lg text-muted-foreground">{status}</p>
    <div className="mt-8">
      {checkSteps.map((step, index) => (
        <div key={index} className={`flex items-center mb-2 ${progress >= step.progress ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-4 h-4 rounded-full mr-2 ${progress >= step.progress ? 'bg-primary' : 'bg-muted'}`}></div>
          <span>{step.status}</span>
        </div>
      ))}
    </div>
    {carInfo && (
      <div className="mt-8">
        <p className="text-xl font-semibold">{`${carInfo.make} ${carInfo.model} (${carInfo.year})`}</p>
        <p className="text-muted-foreground">{`Battery Capacity: ${carInfo.batteryCapacity}`}</p>
        <div className="mt-4 relative w-full h-8 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="text-4xl"
            initial={{ x: '0%' }}
            animate={{ x: `${progress}%` }}
            transition={{ duration: 0.5 }}
          >
            🚗
          </motion.div>
        </div>
      </div>
    )}
  </div>
);

export default StartCheck;