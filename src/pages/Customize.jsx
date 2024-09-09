import React from 'react';
import Navigation from '../components/Navigation';

const Customize = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Customize HV-Check</h1>
        <p className="mb-4">Customize your HV-Check modules and protocols here.</p>
        {/* Add customization options here */}
      </div>
    </div>
  );
};

export default Customize;