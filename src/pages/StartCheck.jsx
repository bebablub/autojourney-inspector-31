import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import CelebrationPopup from '../components/CelebrationPopup';
import RotatingProgressBar from '../components/RotatingProgressBar';
import ConfettiAnimation from '../components/ConfettiAnimation';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BatteryChargingIcon, InfoIcon, AlertTriangleIcon } from 'lucide-react';

const StartCheck = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [batterySize, setBatterySize] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [vciStatus, setVciStatus] = useState('connected');
  const navigate = useNavigate();

  const checkSteps = [
    { progress: 20, status: 'Connecting to the car...' },
    { progress: 40, status: 'Identifying car' },
    { progress: 60, status: 'Scanning control units' },
    { progress: 80, status: '40 control units scanned' },
    { progress: 95, status: 'Preparing protocol' },
    { progress: 100, status: 'Report complete!' },
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

  const startReport = () => {
    const scenarios = ['unsupported', 'selectBattery', 'autoIdentify'];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    
    switch (randomScenario) {
      case 'unsupported':
        setDialogType('unsupported');
        setShowDialog(true);
        break;
      case 'selectBattery':
        setDialogType('selectBattery');
        setShowDialog(true);
        break;
      case 'autoIdentify':
        setSelectedCar('ID.3');
        setIsChecking(true);
        setProgress(0);
        setStatus('Initializing Report...');
        break;
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (dialogType === 'selectBattery' && batterySize) {
      setSelectedCar('ID.4');
      setIsChecking(true);
      setProgress(0);
      setStatus('Initializing Report...');
    }
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  const handleShowMe = () => {
    setShowCelebration(false);
    navigate('/reports');
  };

  const CarAnimation = () => (
    <motion.div
      className="text-4xl"
      initial={{ x: '0%' }}
      animate={{ x: `${progress}%` }}
      transition={{ duration: 0.5 }}
    >
      🚗
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Start Report</h1>
      
      {!isChecking && progress === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-8">
            Ready to ensure your vehicle's high-voltage system is in top shape? Click the button below to start the Report process.
          </p>
          <Button onClick={startReport} size="lg" className="text-2xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-green-500 hover:bg-green-600">
            Start Report
          </Button>
          <p className="mt-4 text-sm text-gray-500">VCI "DiagPro X1" {vciStatus}</p>
        </div>
      ) : (
        <div className="text-center w-full max-w-2xl">
          <div className="relative mb-8">
            <RotatingProgressBar progress={progress} status={status} />
          </div>
          <p className="mt-4 text-lg text-gray-600">
            {status}
          </p>
          <div className="mt-8">
            {checkSteps.map((step, index) => (
              <div key={index} className={`flex items-center mb-2 ${progress >= step.progress ? 'text-green-500' : 'text-gray-400'}`}>
                <div className={`w-4 h-4 rounded-full mr-2 ${progress >= step.progress ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span>{step.status}</span>
              </div>
            ))}
          </div>
          {selectedCar && (
            <div className="mt-8">
              <p className="text-xl font-semibold">Selected Car: {selectedCar}</p>
              <div className="mt-4 relative w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                <CarAnimation />
              </div>
            </div>
          )}
        </div>
      )}

      {showCelebration && <ConfettiAnimation />}
      <CelebrationPopup 
        isOpen={showCelebration} 
        onClose={handleCloseCelebration}
        onShowMe={handleShowMe}
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'unsupported' ? 'Unsupported Car' : 'Select Battery Size'}
            </DialogTitle>
            <DialogDescription>
              {dialogType === 'unsupported' 
                ? "We're sorry, but this car model is not supported by our diagnostic tool."
                : "We couldn't automatically detect your battery size. Please select it manually."}
            </DialogDescription>
          </DialogHeader>
          {dialogType === 'selectBattery' && (
            <>
              <div className="flex items-center space-x-2 mb-4">
                <BatteryChargingIcon className="w-6 h-6 text-blue-500" />
                <Select value={batterySize} onValueChange={setBatterySize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select battery size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="45">45 kWh</SelectItem>
                    <SelectItem value="58">58 kWh</SelectItem>
                    <SelectItem value="77">77 kWh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-500">
                <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>You can find the battery size information in your vehicle's manual or on the manufacturer's website.</p>
              </div>
            </>
          )}
          {dialogType === 'unsupported' && (
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <AlertTriangleIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
              <p>Please check our list of supported vehicles or contact customer support for assistance.</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleDialogClose}>
              {dialogType === 'unsupported' ? 'Close' : 'Continue'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartCheck;