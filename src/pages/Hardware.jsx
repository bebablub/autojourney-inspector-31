import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Hardware = () => {
  const devices = [
    { name: 'Diagnostics Pro X1', type: 'VCI', serialNumber: 'DPX1-12345', firmwareVersion: 'v2.1.3' },
    { name: 'Evaluate Pro', type: 'Evaluate', serialNumber: 'EVP-67890', firmwareVersion: 'v1.5.2' },
    { name: 'workSafe Guardian', type: 'workSafe', serialNumber: 'WSG-24680', firmwareVersion: 'v3.0.1' },
    { name: 'HV-Safety Analyzer', type: 'HV-Safety', serialNumber: 'HVSA-13579', firmwareVersion: 'v2.2.0' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hardware Management</h1>
      {devices.map((device, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{device.name}</CardTitle>
            <CardDescription>Type: {device.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Serial Number: {device.serialNumber}</p>
            <p className="mb-4">Firmware Version: {device.firmwareVersion}</p>
            <Button>Check for Updates</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Hardware;
