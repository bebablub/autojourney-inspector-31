import React from 'react';
import Navigation from '../components/Navigation';

const StartCheck = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Start HV-Check</h1>
        <p className="mb-4">Initiate and monitor your HV-Check process here.</p>
        {/* Add HV-Check initiation and monitoring components here */}
      </div>
    </div>
  );
};

export default StartCheck;