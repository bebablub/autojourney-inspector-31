import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useVehicle } from '../contexts/VehicleContext';

const Reports = () => {
  const { vehicleInfo } = useVehicle();

  const sampleReports = [
    { id: 'HV-2023-001-123', date: '2023-03-23', make: 'Volkswagen', model: 'ID.Buzz', status: 'Pass' },
    { id: 'HV-2023-001-124', date: '2023-03-24', make: 'Tesla', model: 'Model 3', status: 'Fail' },
    { id: 'HV-2023-001-125', date: '2023-03-25', make: 'BMW', model: 'i3', status: 'Pass' },
  ];

  // Add the identified car to the reports if it exists
  const allReports = vehicleInfo
    ? [{ 
        id: `HV-${new Date().getFullYear()}-${String(sampleReports.length + 1).padStart(3, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`, 
        date: new Date().toISOString().split('T')[0], 
        make: vehicleInfo.make, 
        model: vehicleInfo.model, 
        status: 'Pass' 
      }, ...sampleReports]
    : sampleReports;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">HV-Check Reports</h1>
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
    </div>
  );
};

export default Reports;
