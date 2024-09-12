import React, { createContext, useContext, useState } from 'react';

const VehicleContext = createContext();

export const useVehicle = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
  const [vehicleInfo, setVehicleInfo] = useState(null);

  return (
    <VehicleContext.Provider value={{ vehicleInfo, setVehicleInfo }}>
      {children}
    </VehicleContext.Provider>
  );
};