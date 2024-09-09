import React from 'react';
import Navigation from '../components/Navigation';

const Reports = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">HV-Check Reports</h1>
        <p className="mb-4">View and manage your HV-Check reports here.</p>
        {/* Add report management components here */}
      </div>
    </div>
  );
};

export default Reports;