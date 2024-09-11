import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Hardware = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hardware Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Connected Device</CardTitle>
          <CardDescription>Manage your diagnostic hardware</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Device Name: Diagnostics Pro X1</p>
          <p className="mb-4">Serial Number: DPX1-12345</p>
          <p className="mb-4">Firmware Version: v2.1.3</p>
          <Button>Check for Updates</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Hardware;