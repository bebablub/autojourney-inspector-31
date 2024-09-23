import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MyDevices = () => {
  const devices = [
    { id: 1, name: 'VCI Pro X1', serialNumber: 'VCI-12345', status: 'Connected', lastUsed: '2024-03-15' },
    { id: 2, name: 'VCI Lite S2', serialNumber: 'VCI-67890', status: 'Disconnected', lastUsed: '2024-03-10' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Devices</h2>
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
          <CardDescription>Manage your Vehicle Communication Interfaces</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.serialNumber}</TableCell>
                  <TableCell>{device.status}</TableCell>
                  <TableCell>{device.lastUsed}</TableCell>
                  <TableCell>
                    <Button variant="outline">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyDevices;