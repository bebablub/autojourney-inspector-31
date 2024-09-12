import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import VehicleInfo from './VehicleInfo';
import { useVehicle } from '../contexts/VehicleContext';

const Layout = () => {
  const { vehicleInfo } = useVehicle();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      {vehicleInfo && <VehicleInfo />}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="bg-background border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2024 HV-Check Diagnostic Tool. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;