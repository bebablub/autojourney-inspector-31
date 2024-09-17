import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ActivityIcon } from 'lucide-react';

const StartCheck = () => {
  const navigate = useNavigate();

  const startIdentification = () => {
    navigate('/car-identification');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <ActivityIcon className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-4xl font-bold mb-8 text-center">HV-Check Diagnostic Tool</h1>
      <div className="text-center max-w-2xl">
        <p className="text-xl text-muted-foreground mb-8">
          Our advanced AI-powered system will identify your vehicle, read ECU information, and prepare a comprehensive diagnostic report. Start your high-voltage system check now.
        </p>
        <Button onClick={startIdentification} size="lg" className="text-2xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90">
          Start AI-Powered Vehicle Check
        </Button>
      </div>
    </div>
  );
};

export default StartCheck;
