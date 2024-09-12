import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const StartCheck = () => {
  const navigate = useNavigate();

  const startIdentification = () => {
    navigate('/car-identification');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Start AI-Powered Vehicle Check</h1>
      <div className="text-center">
        <p className="text-xl text-muted-foreground mb-8">
          Our advanced AI will identify your vehicle and prepare a customized diagnostic check. Click the button below to begin.
        </p>
        <Button onClick={startIdentification} size="lg" className="text-2xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90">
          Start AI Identification
        </Button>
      </div>
    </div>
  );
};

export default StartCheck;