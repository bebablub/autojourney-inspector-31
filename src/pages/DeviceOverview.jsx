import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DeviceOverview = () => {
  const devices = [
    { id: 1, name: 'VCI Pro X1', serialNumber: 'VCI-12345', assignedTo: 'John Doe', lastUsed: '2024-03-15' },
    { id: 2, name: 'VCI Lite S2', serialNumber: 'VCI-67890', assignedTo: 'Jane Smith', lastUsed: '2024-03-10' },
    { id: 3, name: 'VCI Ultra M3', serialNumber: 'VCI-24680', assignedTo: 'Bob Johnson', lastUsed: '2024-03-12' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Device Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell>{device.name}</TableCell>
              <TableCell>{device.serialNumber}</TableCell>
              <TableCell>{device.assignedTo}</TableCell>
              <TableCell>{device.lastUsed}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2">Reassign</Button>
                <Button variant="outline">View History</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button>Add New Device</Button>
    </div>
  );
};

export default DeviceOverview;