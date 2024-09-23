import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useVehicle } from '../contexts/VehicleContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MyReports = () => {
  const { vehicleInfo } = useVehicle();

  const sampleReports = [
    { id: 'HV-2024-001', date: '2024-03-15', make: 'Volkswagen', model: 'ID.4', status: 'Pass' },
    { id: 'HV-2024-002', date: '2024-03-10', make: 'Tesla', model: 'Model 3', status: 'Fail' },
  ];

  const allReports = vehicleInfo
    ? [{ 
        id: `HV-${new Date().getFullYear()}-${String(sampleReports.length + 1).padStart(3, '0')}`, 
        date: new Date().toISOString().split('T')[0], 
        make: vehicleInfo.make, 
        model: vehicleInfo.model, 
        status: 'Pass' 
      }, ...sampleReports]
    : sampleReports;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Reports</h2>
      <Card>
        <CardHeader>
          <CardTitle>HV-Check Reports</CardTitle>
          <CardDescription>View and manage your diagnostic reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.make}</TableCell>
                  <TableCell>{report.model}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    <Button variant="outline">View Report</Button>
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

export default MyReports;
