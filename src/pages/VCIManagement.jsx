import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VCIManagement = () => {
  const vciList = [
    { id: 1, name: 'VCI Pro X1', serialNumber: 'VCI-12345', status: 'Connected', action: 'Update Available' },
    { id: 2, name: 'VCI Lite S2', serialNumber: 'VCI-67890', status: 'Disconnected', action: 'None' },
    { id: 3, name: 'VCI Ultra M3', serialNumber: 'VCI-24680', status: 'Connected', action: 'None' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">VCI Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Connected VCIs</CardTitle>
          <CardDescription>Manage your Vehicle Communication Interfaces</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Serial Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vciList.map((vci) => (
                <TableRow key={vci.id}>
                  <TableCell>{vci.name}</TableCell>
                  <TableCell>{vci.serialNumber}</TableCell>
                  <TableCell>{vci.status}</TableCell>
                  <TableCell>
                    {vci.action === 'Update Available' ? (
                      <Button variant="outline">Update</Button>
                    ) : (
                      vci.action
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

export default VCIManagement;