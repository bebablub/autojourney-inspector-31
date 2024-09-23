import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, ArrowDownCircle, RefreshCw, Power } from 'lucide-react';

const UpdateSteps = [
  { icon: ArrowDownCircle, description: "Download the latest firmware" },
  { icon: RefreshCw, description: "Install the firmware update" },
  { icon: CheckCircle, description: "Verify the installation" },
  { icon: Power, description: "Restart the device" }
];

const MyDevices = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const devices = [
    { id: 1, name: 'VCI Pro X1', serialNumber: 'VCI-12345', status: 'Connected', lastUsed: '2024-03-15', needsUpdate: true },
    { id: 2, name: 'VCI Lite S2', serialNumber: 'VCI-67890', status: 'Disconnected', lastUsed: '2024-03-10', needsUpdate: false },
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
                    {device.needsUpdate ? (
                      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Update Available</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Process</DialogTitle>
                            <DialogDescription>
                              Follow these steps to update your device:
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            {UpdateSteps.map((step, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <step.icon className="h-6 w-6 text-primary" />
                                <span>{step.description}</span>
                              </div>
                            ))}
                          </div>
                          <Button onClick={() => setIsUpdateDialogOpen(false)}>Close</Button>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="outline">Details</Button>
                    )}
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
