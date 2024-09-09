import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to HV-Check Diagnostic Tool</h1>
        <p className="text-xl mb-8">
          Empower your automotive diagnostics with our all-encompassing tool for modern vehicles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Start a New HV-Check</h2>
            <p className="mb-4">Configure and initiate a new high-voltage check for a vehicle.</p>
            <Link to="/customize">
              <Button>Customize and Start</Button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">View Reports</h2>
            <p className="mb-4">Access and manage all your generated HV-Check reports.</p>
            <Link to="/reports">
              <Button>View Reports</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;